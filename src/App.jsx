import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './shoppe.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dangky from './dangky'
import Dangnhap from './dangnhap'
import Dangkyshop from './dangkyshop'
function App() {
  let [count, setCount] = useState();
  let [hien, setHien] = useState();
  useEffect(() => {
    if(window.location.href == 'http://localhost:1800/dangkyshop'){
      setCount('Đăng ký shop');
      setHien(true);
    }
    if(window.location.href == 'http://localhost:1800/dangky'){
      setCount('Đăng ký');
      setHien(true);
    }
    if(window.location.href == 'http://localhost:1800/dangnhap'){
      setCount('Đăng nhập');
      setHien(true);
    }
  }, []);
  return (
    <>
      <div>
        <div className='top'>
          <div className='logotopgiua'>
            <a href="">
              <i className="fa-brands fa-shopify logotop"></i>
            </a>
          </div>
          <div className='chusobetop'>
            <a href="" className='mausobetop'>Sobe</a>
          </div>
          {hien ? <div className='canhchusobetop'>{count}</div> : <div></div>}
        </div>
        <div>
          <BrowserRouter>
            <Routes>
              <Route index element={<Dangky ></Dangky>} />
              <Route path="dangky" element={<Dangky />} />
              <Route path="dangnhap" element={<Dangnhap />} />
              <Route path="dangkyshop" element={<Dangkyshop />} />
            </Routes>
          </BrowserRouter>
        </div>
        <div className='bottom'>
          <div className='chusobebottom'>Công ty TNHH Sobe</div>
          <div className='chugioithieubottom'>Địa chỉ: Tầng 4-5-6, Tòa nhà Màu cam, Xóm 1 Thôn Yên Nội, Xã Đồng Quang, Huyện Quốc Oai, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 0964043796 - Email: namden.1@gmail.com</div>
          <div className='chugioithieubottom'>Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Phú Nam</div>
          <div className='chugioithieubottom'>Mã số doanh nghiệp: 02035431365 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 23/12/2024</div>
          <div className='chugioithieubottom'>© 2024 - Bản quyền thuộc về Công ty TNHH Sobe</div>
        </div>
      </div>
    </>
  )
}

export default App
