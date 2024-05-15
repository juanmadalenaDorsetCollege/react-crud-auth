

export default function Gallery({images}) {
    return (
        <div className="">
            <div className="snap-center">
                <img className={`w-full rounded-lg h-[70dvh] md:max-h-dvh object-contain`} 
                src={images}
                alt={images} />
            </div>
        </div>
    )
}