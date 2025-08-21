export function Loading() {
    return (
        <div>
            <div className="fixed z-50 top-0 left-0 w-full h-full"></div>
            <div className="fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}