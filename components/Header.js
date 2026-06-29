'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '@/store/slices/resumeSlice';

const Header = () => {
    const language = useSelector(state => state.resume.language) || 'en';
    const dispatch = useDispatch();

    const toggleLanguage = () => {
        dispatch(setLanguage(language === 'en' ? 'zh' : 'en'));
    };

    return (
        <header className="mx-auto flex max-w-screen-xl items-center px-3 py-2.5 2xl:max-w-screen-2xl">
            <Link href={'/'} className="mr-auto text-2xl">
                <span className="text-gradient">Resumave</span>
            </Link>
            <button
                onClick={toggleLanguage}
                className="cursor-pointer rounded-md bg-gray-700 px-3 py-1.5 text-sm hover:bg-gray-600"
                title={language === 'en' ? 'Switch to Chinese' : '切换到英文'}
            >
                {language === 'en' ? 'EN' : '中'}
            </button>
        </header>
    );
};

export default Header;
