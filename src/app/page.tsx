'use client';

import Link from "next/link"
import { Book, GraduationCap, Users, Code, ArrowRight, Calendar, Trophy } from 'lucide-react'
import { useState, useEffect } from "react"
import ModelStart from "@/components/ModelStart"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      setIsModalOpen(true)
    }, 1000)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {
        loading && (
          <div className="fixed z-50 top-0 flex justify-center items-center w-full bg-black bg-opacity-80 h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
            <div className="text-green-700 fixed font-black animate-pulse">
              SFIT
            </div>
            <div className="animate-spin rounded-full h-20 w-20 border-r-2 fixed border-l-2 border-green-400"></div>
          </div>
        )
      }
      <ModelStart isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Hero Section */}
      <header className="relative bg-white">
        <div className="container px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block text-green-600">SFIT</span>
                <span className="block">UTC&apos;s IT Club</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Khám phá, học hỏi và phát triển cùng cộng đồng sinh viên CNTT tại UTC.
                Đây là trang web hỗ trợ các lớp học SFIT hoạt động một cách hiệu quả.
              </p>
              <div className="mt-8 space-x-4">
                <Link href={'/login'} className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 inline-flex items-center">
                  Tham gia ngay
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link href={'https://sfit.com.vn'} className="px-4 py-2 text-green-600 bg-white border border-green-600 rounded hover:bg-green-50">
                  Tìm hiểu thêm
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/bgclb.jpg?height=400&width=600"
                alt="Students collaborating"
                className="rounded-lg shadow-xl"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Học tập ngay bây giờ</h2>
            <p className="mt-4 text-lg text-gray-600">Những lợi ích mà các lớp học miễn phí mà Câu Lạc Bộ SFIT đem lại</p>
          </div>
          <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow">
              <Book className="w-12 h-12 text-green-600" />
              <h3 className="mt-4 text-xl font-medium">Học tập chuyên sâu</h3>
              <p className="mt-2 text-gray-600">Học tập các kiến thức đại cương cho người mới</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <Users className="w-12 h-12 text-green-600" />
              <h3 className="mt-4 text-xl font-medium">Môi trường năng động</h3>
              <p className="mt-2 text-gray-600">Với đa dạng các ban, các cuộc thi,...</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <Code className="w-12 h-12 text-green-600" />
              <h3 className="mt-4 text-xl font-medium">Giảng viên được tuyển chọn</h3>
              <p className="mt-2 text-gray-600">Các thành viên giảng dạy đều được chắt lọc kĩ từ ban chuyên môn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900">Các lớp học hiện tại</h2>
          <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow">
              <GraduationCap className="w-8 h-8 text-green-600" />
              <h3 className="mt-4 text-xl font-medium">Tin đạt cương</h3>
              <p className="mt-2 text-gray-600">T2 đến T7 - Phòng 404A4</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <Code className="w-12 h-12 text-green-600" />
              <h3 className="mt-4 text-xl font-medium">Kỹ thuật lập trình</h3>
              <p className="mt-2 text-gray-600">T2 đến T7 - Phòng 404A4</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <GraduationCap className="w-8 h-8 text-green-600" />
              <h3 className="mt-4 text-xl font-medium">Cấu trúc dữ liệu giải thuật</h3>
              <p className="mt-2 text-gray-600">T2 đến T7 - Phòng 404A4</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <GraduationCap className="w-8 h-8 text-green-600" />
              <h3 className="mt-4 text-xl font-medium">Lập trình hướng đối tượng</h3>
              <p className="mt-2 text-gray-600">T2 đến T7 - Phòng 404A4</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <GraduationCap className="w-8 h-8 text-green-600" />
              <h3 className="mt-4 text-xl font-medium">Thiết kế Web</h3>
              <p className="mt-2 text-gray-600">T2 đến T7 - Phòng 404A4</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <GraduationCap className="w-8 h-8 text-green-600" />
              <h3 className="mt-4 text-xl font-medium">Kĩ thuật máy tính (Assembly)</h3>
              <p className="mt-2 text-gray-600">T2 đến T7 - Online</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="container px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">Sẵn sàng tham gia cùng SFIT?</h2>
          <p className="mt-4 text-xl text-green-100">Đăng ký ngay để không bỏ lỡ các cơ hội học tập và phát triển</p>
          <Link href={'/register'} className="mt-8 px-6 py-3 text-green-600 bg-white rounded-full hover:bg-green-50 inline-flex items-center">
            Đăng ký thành viên
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <h3 className="text-xl font-bold text-white">SFIT - UTC&apos;s IT Club</h3>
              <p className="mt-4 text-gray-400">Câu lạc bộ Tin học trường Đại học Giao thông Vận tải</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Liên hệ</h4>
              <p className="mt-4 text-gray-400">Email: clbtinhocgtvt@gmail.com</p>
              <p className="mt-2 text-gray-400">Địa chỉ: Samsung Lab, tầng 4, tòa A4,
                trường Đại học Giao thông Vận tải</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Theo dõi chúng tôi</h4>
              <div className="flex mt-4 space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Tiktok
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Github
                </Link>
              </div>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-gray-800">
            <p className="text-center text-gray-400">&copy; 2024 SFIT&zunohoang. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}