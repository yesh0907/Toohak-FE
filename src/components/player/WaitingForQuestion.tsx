export default function WaitingForQuestion() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl text-black mb-3">Waiting for question...</h1>
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
            </div>
        </div>
    )
}
