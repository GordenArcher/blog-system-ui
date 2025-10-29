
interface Props {
    head?: string;
    title: string;
    para: string;
}

const PageHeader = ({ head, title, para }: Props) => {
    return (
        <div className="flex items-center justify-center flex-col gap-3.5 mb-12">
            <h4 className="font-semibold text-lg">{head}</h4>

            <div className="pb-6">
                <h1 className="text-5xl max-md:text-5xl font-bold">{title}</h1>
            </div>

            <p className="text-[16px] font-normal max-w-2xl text-center">{para}</p>
        </div>
    )
}

export default PageHeader