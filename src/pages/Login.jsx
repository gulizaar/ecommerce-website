import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../redux/client/clientThunk";
import { toast } from "react-toastify";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = async (values) => {
        if (loading) return;
        setLoading(true);

        try {
            await dispatch(
                loginUser(
                    {
                        email: values.email,
                        password: values.password,
                    },
                    values.rememberMe,
                    navigate,
                    from
                )
            );
        } catch (err) {
            const msg =
                err?.response?.data?.message ||
                "Giriş başarısız. Lütfen bilgilerinizi kontrol edin.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const getInputClassName = (hasError) =>
        `w-full rounded-lg border px-4 py-3 outline-none transition ${hasError
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-slate-900"
        } focus:ring-4 focus:ring-slate-900/10`;

    return (
        <><Header />
            <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-lg">

                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900 text-2xl font-bold text-white">
                            W
                        </div>
                        <h1 className="mb-1 text-3xl font-bold text-slate-900">Giriş Yap</h1>
                        <p className="text-sm text-gray-500">Hesabınıza giriş yapın</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                            )}
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
                                })}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="mb-6 flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                className="h-4 w-4 rounded border-gray-300"
                                {...register("rememberMe")}
                            />
                            <label htmlFor="rememberMe" className="text-sm text-gray-600">
                                Beni Hatırla
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                    Giriş yapılıyor...
                                </>
                            ) : (
                                "Giriş Yap"
                            )}
                        </button>

                        <p className="mt-5 text-center text-sm text-gray-500">
                            Hesabın yok mu?{" "}
                            <Link to="/signup" className="font-semibold text-slate-900">
                                Kayıt ol
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}