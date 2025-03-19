'use client'

import Link from "next/link"
import axios from "axios"
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from "next/navigation";


export default function Home() {
    const pathName = usePathname();
    const classCode = pathName.split('/')[2];
  const router = useRouter()
  const [newClass, setNewClass] = useState<any>({
    name: '',
  })

  useEffect(() => {
    async function callApiClasses() {
      const email: any = localStorage.getItem('email');
      const password: any = localStorage.getItem('password');
      const response: any = await axios.get('/api/class-name?id=' + classCode, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${email}:${password}`)}`
                }
      });
      const data = response.data;
      console.log(data);
      if (data.success) {
        console.log(data.data.name);
          setNewClass({
            name: data.data.name,
          });
      }
    }
    callApiClasses();
  }, [classCode]);

  const joinClassByCode = async () => {
    const email: any = localStorage.getItem('email');
    const password: any = localStorage.getItem('password');

    try {
        const response: any = await axios.post('/api/users/classes', {
            classroomCode: classCode
          }, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Basic ${btoa(`${email}:${password}`)}`
                }
        });
        const data = response.data;
        if (data.success) {
            // chuyen huong
            router.push('/classes/' + classCode);
        } else {
          alert("Thất bại")
        }
    } catch (error) {
      alert('Đã tham gia');
    }
}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-600 mb-2">SFIT</h1>
        <p className="text-gray-600 text-lg">Nền tảng học tập trực tuyến</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Lớp {newClass.name}</h2>

        <p className="text-gray-600 mb-6 text-center">Nhấn vào nút bên dưới để tham gia lớp học</p>

        <div className="block w-full">
          <button className="w-full bg-green-600 hover:bg-green-700 p-2 text-white rounded-sm"
            onClick={() => joinClassByCode()}
          >Tham gia ngay</button>
        </div>
      </div>
    </div>
  )
}

