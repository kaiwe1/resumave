import dynamic from 'next/dynamic';

const Tabs = dynamic(() => import('@/components/Tabs'), { ssr: false })
const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });
const Preview = dynamic(() => import('@/components/Resume/Preview'), { ssr: false });

const page = ({ searchParams: { tab = 'contact' } }) => {
    return (
        <div className="mx-auto mt-8 flex max-w-screen-xl 2xl:max-w-screen-2xl flex-col-reverse gap-10 px-3 pb-8 md:flex-row md:mt-8 2xl:mt-14 2xl:gap-16">
            <Preview />
            <div className="flex-grow ">
                <Tabs activeTab={tab} />
                <Editor tab={tab} />
            </div>
        </div>
    );
};

export default page;
