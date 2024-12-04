
/**
 * Project: study.sfit.com.vn
 * Author: zunohoang (https://github.com/zunohoang)
 * Email: nguyenvanhoang2005nt@gmail.com
 */

'use client'

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <div className="flex flex-col min-h-screen">
            {children}
        </div>
    )
}