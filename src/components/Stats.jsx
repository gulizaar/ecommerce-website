import React from 'react'

const stats = [
    { value: '15K', label: 'Happy Customers' },
    { value: '150K', label: 'Monthly Visitors' },
    { value: '15', label: 'Countries Worldwide' },
    { value: '100+', label: 'Top Partners' },
]

function Stats() {
    return (
        <div className='flex flex-col md:flex-row items-center justify-center px-10 py-14 gap-10 md:gap-24'>
            {stats.map((stat, index) => (
                <div key={index} className='text-center'>
                    <p className='text-5xl font-bold text-[rgba(37,43,66,1)] mb-2'>{stat.value}</p>
                    <p className='text-sm text-gray-500'>{stat.label}</p>
                </div>
            ))}
        </div>
    )
}

export default Stats