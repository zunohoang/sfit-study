'use client';

import React, { useEffect, useState } from 'react';
import DisplayContent from '@/components/DisplayContent';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface NewsArticle {
    id: number;
    title: string;
    content: string;
    date: string;
}

const NewsPage: React.FC = () => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('email') == null || localStorage.getItem('password') == null) {
            router.push('/login');
            return;
        }
        setArticles([
            {
                id: 1,
                title: 'Phiên bản V.0.0 Beta ra mắt',
                content: `
                    <p><b>Ban Chủ Nhiệm, Chuyên môn</b> rất vui mừng thông báo với các bạn rằng phiên bản <b>V.0.0 Beta</b> của trang web đã được <b>ra mắt</b>.</p>
                    <p>Trang web này được xây dựng với mục đích hỗ trợ các lớp học của CLB SFIT.</p>
                    <p>Mình rất mong nhận được sự đóng góp của các bạn để cải thiện trang web hơn nữa.</p>
                    </br>
                    <p>Vì đây là phiên bản đầu tiên được code <b>trong vài 3 buổi</b> nên sẽ có đôi chỗ <b>chưa ổn</b>, <b>mong các bạn thông cảm.</b></p>
                    </br>
                    <p style="text-align: end;"><i>Hãy donate hoặc cho tác giả 1 follow :> tại <a href="https://github.com/zunohoang" style="color: blue">zunohoang</a></i></p>
                `,
                date: '13-11-2024',
            },
            {
                id: 2,
                title: 'Chào mứng đến với trang web hỗ trợ các lớp học của CLB SFIT',
                content: 'Welcome to SFIT Club',
                date: '13-11-2024',
            },
        ]);
    }, []);

    return (
        <main className="flex-grow">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-2xl font-bold mb-4 text-green-600">Bản Tin</h1>
                    {articles.map(article => (
                        <div key={article.id} className="mb-6">
                            <h2 className="text-xl font-semibold mb-2 text-green-500">{article.title}</h2>
                            <p className="text-gray-500 mb-2">zunohoang - {article.date}</p>
                            <DisplayContent content={article.content} />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default NewsPage;