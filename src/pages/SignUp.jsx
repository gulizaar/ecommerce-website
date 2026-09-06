import api from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../redux/client/clientThunk";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom"; // Link eklendi

// regex güncellendi (büyük/küçük harf duyarlılığı esnetildi)
const TR_PHONE_REGEX = /^(\+90|0)?5\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
const TAX_NO_REGEX = /^[Tt]\d{4}[Vv]\d{6}$/; // t ve v küçük de yazılabilir
const IBAN_REGEX = /^TR\d{2}[0-9]{4}[0-9]{16}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function SignUp() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const dispatch = useDispatch();

    const roles = useSelector(
        (state) => state.client.roles
    );
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role_id: "",
            store: {
                name: "",
                phone: "",
                tax_no: "",
                bank_account: "",
            },
        },
    });

    const selectedRoleId = watch("role_id");
    const password = watch("password");

    useEffect(() => {
        dispatch(fetchRoles());
    }, [dispatch]);
    useEffect(() => {
        if (roles.length > 0) {
            const customerRole = roles.find(
                (r) =>
                    r.name?.toLowerCase().includes("customer") ||
                    r.code?.toLowerCase().includes("customer") ||
                    r.name?.toLowerCase() === "müşteri"
            );

            if (customerRole) {
                setValue("role_id", String(customerRole.id));
            } else {
                setValue("role_id", String(roles[0].id));
            }
        }
    }, [roles, setValue]);

    const selectedRole = roles.find(
        (r) => String(r.id) === String(selectedRoleId)
    );

    const isStore =
        selectedRole?.name?.toLowerCase() === "store" ||
        selectedRole?.code?.toLowerCase() === "store" ||
        selectedRole?.name?.toLowerCase() === "mağaza";

    const onSubmit = async (values) => {
        if (loading) return;

        setLoading(true);
        setApiError("");

        const payload = isStore
            ? {
                name: values.name,
                email: values.email,
                password: values.password,
                role_id: Number(values.role_id),
                store: {
                    name: values.store.name,
                    phone: values.store.phone,
                    tax_no: values.store.tax_no.toUpperCase(), // Backend'e giderken büyük harfe zorluyoruz
                    bank_account: values.store.bank_account,
                },
            }
            : {
                name: values.name,
                email: values.email,
                password: values.password,
                role_id: Number(values.role_id),
            };

        try {
            await api.post("/signup", payload);

            alert(
                "Hesabınızı etkinleştirmek için e-postadaki bağlantıya tıklamanız gerekiyor!"
            );

            navigate(-1);
        } catch (err) {
            const responseMessage =
                err?.response?.data?.message ||
                err?.response?.data ||
                "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.";

            setApiError(
                typeof responseMessage === "string"
                    ? responseMessage
                    : JSON.stringify(responseMessage)
            );
        } finally {
            setLoading(false);
        }
    };

    const Err = ({ msg }) =>
        msg ? <p className="mt-1 text-sm text-red-500">{msg}</p> : null;

    const getInputClassName = (hasError) => {
        return `w-full rounded-lg border px-4 py-3 outline-none transition ${hasError
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-slate-900"
            } focus:ring-4 focus:ring-slate-900/10`;
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-8">
            <div className="w-full max-w-xl rounded-2xl bg-white p-10 shadow-lg">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900 text-2xl font-bold text-white">
                        W
                    </div>
                    <h1 className="mb-1 text-3xl font-bold text-slate-900">
                        Hesap Oluştur
                    </h1>
                    <p className="text-sm text-gray-500">
                        Workintech e-ticaret platformuna hoş geldiniz
                    </p>
                </div>

                {/* API error */}
                {apiError && (
                    <div className="mb-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        ⚠ {apiError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* Name */}
                    <div className="mb-4">
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                            Ad Soyad
                        </label>
                        <input
                            className={getInputClassName(errors.name)}
                            {...register("name", {
                                required: "Ad alanı zorunludur",
                                minLength: {
                                    value: 3,
                                    message: "En az 3 karakter olmalıdır",
                                },
                            })}
                        />
                        <Err msg={errors.name?.message} />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                            E-posta
                        </label>
                        <input
                            type="email"
                            className={getInputClassName(errors.email)}
                            {...register("email", {
                                required: "E-posta zorunludur",
                                pattern: {
                                    value: EMAIL_REGEX,
                                    message: "Geçerli bir e-posta adresi giriniz",
                                },
                            })}
                        />
                        <Err msg={errors.email?.message} />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                            Şifre
                        </label>
                        <input
                            type="password"
                            className={getInputClassName(errors.password)}
                            {...register("password", {
                                required: "Şifre zorunludur",
                                pattern: {
                                    value: PWD_REGEX,
                                    message: "Şifre en az 8 karakter olmalı; büyük harf, küçük harf, sayı ve özel karakter içermelidir",
                                },
                            })}
                        />
                        <Err msg={errors.password?.message} />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4">
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                            Şifre Tekrar
                        </label>
                        <input
                            type="password"
                            className={getInputClassName(errors.confirmPassword)}
                            {...register("confirmPassword", {
                                required: "Şifre tekrarı zorunludur",
                                validate: (v) =>
                                    v === password || "Şifreler eşleşmiyor",
                            })}
                        />
                        <Err msg={errors.confirmPassword?.message} />
                    </div>

                    {/* Role */}
                    <div className="mb-4">
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                            Hesap Türü
                        </label>
                        <select
                            value={selectedRoleId || ""}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10"
                            {...register("role_id", { required: true })}
                        >
                            {roles.length === 0 && <option value="">Roller Yükleniyor...</option>}
                            {roles.map((r) => (
                                <option key={r.id} value={r.id}>
                                    {r.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Store Fields */}
                    {isStore && (
                        <div className="mb-5 rounded-xl border border-gray-200 bg-gray-50 p-5">
                            <div className="mb-4 flex items-center gap-2 font-bold text-slate-900">
                                🏪 Mağaza Bilgileri
                            </div>

                            {/* Store Name */}
                            <div className="mb-3">
                                <input
                                    placeholder="Mağaza adı"
                                    className={getInputClassName(errors.store?.name)}
                                    {...register("store.name", {
                                        required: isStore ? "Mağaza adı zorunludur" : false,
                                        minLength: {
                                            value: 3,
                                            message: "Mağaza adı en az 3 karakter olmalıdır",
                                        },
                                    })}
                                />
                                <Err msg={errors.store?.name?.message} />
                            </div>

                            {/* Store Phone */}
                            <div className="mb-3">
                                <input
                                    placeholder="Telefon (Örn: 05XXXXXXXXX)"
                                    className={getInputClassName(errors.store?.phone)}
                                    {...register("store.phone", {
                                        required: isStore ? "Mağaza telefonu zorunludur" : false,
                                        pattern: {
                                            value: TR_PHONE_REGEX,
                                            message: "Geçerli bir Türkiye telefon numarası giriniz",
                                        },
                                    })}
                                />
                                <Err msg={errors.store?.phone?.message} />
                            </div>

                            {/* Store Tax No */}
                            <div className="mb-3">
                                <input
                                    placeholder="Vergi No (Örn: T1234V123456)"
                                    className={getInputClassName(errors.store?.tax_no)}
                                    {...register("store.tax_no", {
                                        required: isStore ? "Vergi numarası zorunludur" : false,
                                        pattern: {
                                            value: TAX_NO_REGEX,
                                            message: "Vergi numarası TXXXXVXXXXXX formatında olmalıdır",
                                        },
                                    })}
                                />
                                <Err msg={errors.store?.tax_no?.message} />
                            </div>

                            {/* Store Bank Account (IBAN) */}
                            <div className="mb-3">
                                <input
                                    placeholder="IBAN"
                                    className={getInputClassName(errors.store?.bank_account)}
                                    {...register("store.bank_account", {
                                        required: isStore ? "IBAN zorunludur" : false,
                                        pattern: {
                                            value: IBAN_REGEX,
                                            message: "Geçerli bir IBAN adresi giriniz",
                                        },
                                    })}
                                />
                                <Err msg={errors.store?.bank_account?.message} />
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
                    >
                        {loading ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                Kaydediliyor...
                            </>
                        ) : (
                            "Kayıt Ol"
                        )}
                    </button>

                    {/* Düz <a> yerine <Link> kullanıldı */}
                    <p className="mt-5 text-center text-sm text-gray-500">
                        Zaten hesabın var mı?{" "}
                        <Link to="/login" className="font-semibold text-slate-900">
                            Giriş yap
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}