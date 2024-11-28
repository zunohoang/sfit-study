export default function ClassInfo({ classDetails }: { classDetails: any }) {
    return (
        <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Thông tin khóa học</h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Giảng viên</dt>
                    <dd className="mt-1 text-sm text-gray-900">{classDetails.teacher}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Thời lượng</dt>
                    <dd className="mt-1 text-sm text-gray-900">{classDetails.time}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Số lượng học viên</dt>
                    <dd className="mt-1 text-sm text-gray-900">{classDetails.studentNum}</dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Ngày bắt đầu</dt>
                    <dd className="mt-1 text-sm text-gray-900">**/**/2024</dd>
                </div>
                <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Mô tả</dt>
                    <dd className="mt-1 text-sm text-gray-900">{classDetails.description}</dd>
                </div>
            </dl>
        </div>
    )
}

