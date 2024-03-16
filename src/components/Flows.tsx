import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IRootState } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import { FlowFace, ResponseData } from '../types';
import getData from '../utils/getData';
import { getPrettyTime } from '../utils/utils';
import { Miniloader } from './Component/Miniloader';
const options = [
    { value: '50', label: '50' },
    { value: '100', label: '100' },
    { value: '200', label: '200' }
];
function Flows () {
    const dispatch = useDispatch();
    const [data, setData] = useState<{ region: string; limit: string }>();
    const [events, setEvents] = useState<ResponseData<FlowFace>>({ data: [], limit: 0, offset: 0, total: 0 });
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const { token } = useSelector((state: IRootState) => state.data);

 
    useEffect(() => {
      dispatch(setPageTitle('Flows'));
        getData({
            url: `/flows?${data?.limit ? `&page[limit]=${data?.limit}` : ''}${page ? `&page[offset]=${page}` : ''}`,
            setData: setEvents,
            setLoading,
            token
        });
    }, [page, data?.limit]);

    const handleChange = (e: any) => {
        setData(prevData => ({
            ...prevData!,
            [e.target.name]: e.target.value
        }));
        setPage(0)
    };
    return (
        <>
            <ul className='flex space-x-2 rtl:space-x-reverse'>
                <li>
                    <Link to='/' className='text-primary hover:underline'>
                        Asosiy sahifa
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Flow</span>
                </li>
            </ul>
            <div className='panel  mt-5'>
                <div className='flex items-center mb-5  justify-between '>
                    <h5 className='font-semibold text-lg dark:text-white-light'>Barchasi ({events?.total})</h5>
                    <div className=' flex justify-end  items-center w-1/2'>
                        <select className='form-input h-13 w-fit  flex ' name='limit' onChange={e => handleChange(e)}>
                            <option value={''}>Limit </option>
                            {options.map((el, i) => (
                                <option value={el.value} key={i}>
                                    {el.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='flex flex-row items-stretch gap-5 '>
                    <div className='table-responsive mb-5 w-full'>
                        <table>
                            <thead>
                                <tr>
                                    <th className='text-xs'>#</th>
                                    <th className='text-xs'>Obyekt nomi</th>
                                    <th className='text-xs'>Kunlik suv satxi(sm)</th>
                                    <th className='text-xs'>Oylik suv satxi(sm)</th>
                                    <th className='text-xs'>Jami suv satxi(sm)</th>
                                    <th className='text-xs'>Vaqt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.data.map((data: FlowFace, i) => {
                                    return (
                                        <tr key={data._id}>
                                            <td>{events.limit * events.offset + (i + 1)}</td>
                                            <td>
                                                <div className='whitespace-nowrap text-xs'>{data?.name}</div>
                                            </td>
                                            <td>
                                                <div className='whitespace-nowrap'>{data?.day}</div>
                                            </td>
                                            <td>
                                                <div className='whitespace-nowrap '>{data?.month}</div>
                                            </td>
                                            <td>
                                                <div className='whitespace-nowrap '>{data?.total}</div>
                                            </td>
                                            <td>
                                                <div className=' block '>{getPrettyTime(data?.created_at)}</div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <ul className='flex items-center justify-center space-x-1 rtl:space-x-reverse  mt-8 mx-auto'>
                            <li>
                                <button
                                    disabled={page === 0}
                                    onClick={() => !loading && setPage(page - 1)}
                                    type='button'
                                    className='flex justify-center font-semibold p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                                >
                                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 rtl:rotate-180'>
                                        <path d='M15 5L9 12L15 19' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                                    </svg>
                                </button>
                            </li>
                            <li>
                                <button
                                    type='button'
                                    className={`flex justify-center items-center w-10 h-10 font-semibold p-2 rounded-full transition  text-dark hover:text-white hover:bg-primary dark:text-white-light  dark:hover:bg-primary dark:bg-primary`}
                                >
                                    {loading ? <Miniloader /> : page + 1}
                                </button>
                            </li>
                            <li>
                                <button
                                    disabled={events?.total / events?.limit <= page + 1}
                                    onClick={() => !loading && setPage(page + 1)}
                                    type='button'
                                    className='flex justify-center font-semibold p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary'
                                >
                                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='rtl:rotate-180'>
                                        <path d='M9 5L15 12L9 19' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Flows;
