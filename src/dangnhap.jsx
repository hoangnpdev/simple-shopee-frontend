import { useEffect, useRef, useState } from 'react';
import './shoppe.css'
function Dangnhap() {

    const dangnhap = () => {
        let taikhoan = document.getElementById("taotaikhoan").value;
        let matkhau = document.getElementById("taomatkhau").value;
        let themnguoidung = { taikhoan, matkhau };
        fetch('http://localhost:2003/dangnhap', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(themnguoidung)
        })
            .then(response => response.json())
            .then(manage => {
                fetch('http://localhost:2003/checkvar', {
                    method: 'GET',
                    credentials: 'include',
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data) {
                            window.alert('dang nhap thanh cong');
                            console.log(data);
                        } else {
                            window.alert('sai tai khoan hoac mat khau');
                        }
                    })
                    .catch(error => console.error(error));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const dangnhap1 = (so1) => {
        if (so1.key === "Enter") {
            let taikhoan = document.getElementById("taotaikhoan").value;
            let matkhau = document.getElementById("taomatkhau").value;
            let themnguoidung = { taikhoan, matkhau };
            fetch('http://localhost:2003/dangnhap', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(themnguoidung)
            })
                .then(response => response.json())
                .then(manage => {
                    fetch('http://localhost:2003/checkvar', {
                        method: 'GET',
                        credentials: 'include',
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data) {
                                window.alert('dang nhap thanh cong');
                                console.log(data);
                            } else {
                                window.alert('sai tai khoan hoac mat khau');
                            }
                        })
                        .catch(error => console.error(error));
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    return (
        <>
            <div className='dangky'>
                <div className='row g-0'>
                    <div className='col-sm-2'></div>
                    <div className='col-sm-8 row'>
                        <div className='col-sm-6 cangiua'>
                            <i className="fa-brands fa-shopify logodangky"></i>
                            <div className='chusobedangky'>Sobe</div>
                            <div className='chuduoisobe'>Nền tảng thương mại điện tử yêu thích ở Yên Nội & Đồng Quang</div>
                        </div>
                        <div className='col-sm-6 cangiua'>
                            <div className='bangdangnhap'>
                                <div className='chudangky'>Đăng nhập</div>
                                <div className='taotaikhoan'>
                                    <input type="text" className='dangnhaptaikhoan' placeholder="Email hoặc số điện thoại" id='taotaikhoan' />
                                    <input type="password" className='dangnhaptaikhoan' placeholder="Mật khẩu" id='taomatkhau' onKeyUp={dangnhap1} />
                                    <button className='bamdangnhap' onClick={dangnhap}>Đăng nhập</button>
                                </div>
                                <div className='dacotaikhoan'>
                                    <div className='bandacotaikhoan'>Bạn chưa có tài khoản?</div>
                                    <div className='cothidangnhap'><a href="http://localhost:1800/dangky" className='maucothidangnhap'>Đăng ký</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-2'></div>
                </div>
            </div>
        </>
    )

}
export default Dangnhap;