const SkeletonCard = () => {
    return (
        <div className="animate-pulse bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                </div>
            </div>

                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
    )
}

export default SkeletonCard;