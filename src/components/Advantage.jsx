function Advantage({img, title, description}) {
    return(
        <div className="flex flex-col gap-3">
            <img src={img} alt="" className="h-[128px] mx-auto" />
            <p className="font-bold text-black text-lg dark:text-white">{title}</p>
            <p className="text-gray-500 dark:text-white">{description}</p>
        </div>
    );
}


export default Advantage;