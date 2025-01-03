import { useEffect, useRef, useState } from 'react';
import './shoppe.css'
function Dangky() {
    // useEffect(() => {
    //     fetch('http://localhost:2003/taikhoan')
    //         .then(response => response.json())
    //         .then(data => {
    //             setFire(data);
    //         })
    //         .catch(error => console.error(error));
    // }, []);
    const taotaikhoan = () => {
        let taikhoan = document.getElementById("taotaikhoan").value;
        let matkhau = document.getElementById("taomatkhau").value;
        let nhaplaimatkhau = document.getElementById("nhaplaimatkhau").value;
        let themnguoidung = { taikhoan, matkhau };
        if (matkhau == nhaplaimatkhau) {
            fetch('http://localhost:2003/dangky', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(themnguoidung)
            })
                .then(response => response.json())
                .then(manage => {
                    if (manage) {
                        window.alert("Đăng ký thành công");
                        const inputs = document.querySelectorAll('input');
                        inputs.forEach(input => {
                            input.value = '';
                        });
                    } else {
                        window.alert("Tài khoản đã tồn tại");
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            window.alert("Sai mật khẩu");
        }

    }
    const taotaikhoan1 = (so1) => {
        if (so1.key === "Enter") {
            let taikhoan = document.getElementById("taotaikhoan").value;
            let matkhau = document.getElementById("taomatkhau").value;
            let nhaplaimatkhau = document.getElementById("nhaplaimatkhau").value;
            let themnguoidung = { taikhoan, matkhau };
            if (matkhau == nhaplaimatkhau) {
                fetch('http://localhost:2003/dangky', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(themnguoidung)
                })
                    .then(response => response.json())
                    .then(manage => {
                        if (manage) {
                            window.alert("Đăng ký thành công");
                            const inputs = document.querySelectorAll('input');
                            inputs.forEach(input => {
                                input.value = '';
                            });
                        } else {
                            window.alert("Tài khoản đã tồn tại");
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            } else {
                window.alert("Sai mật khẩu");
            }
        }
    }

    return (
        <>
            <div className='dangky'>
                <div className='row'>
                    <div className='col-sm-2'></div>
                    <div className='col-sm-8 row'>
                        <div className='col-sm-6 cangiua'>
                            <i className="fa-brands fa-shopify logodangky"></i>
                            <div className='chusobedangky'>Sobe</div>
                            <div className='chuduoisobe'>Nền tảng thương mại điện tử yêu thích ở Yên Nội & Đồng Quang</div>
                        </div>
                        <div className='col-sm-6 cangiua'>
                            <div className='bangdangky'>
                                <div className='chudangky'>Đăng ký</div>
                                <div className='taotaikhoan'>
                                    <input type="text" className='taoacc' placeholder="Email hoặc số điện thoại" id='taotaikhoan' />
                                    <input type="password" className='taoacc' placeholder="Mật khẩu" id='taomatkhau' />
                                    <input type="password" className='taoacc' placeholder="Nhập lại mật khẩu" id='nhaplaimatkhau' onKeyUp={taotaikhoan1} />
                                    <button className='bamtaoacc' onClick={taotaikhoan}>Đăng ký</button>
                                </div>
                                <div className='dacotaikhoan'>
                                    <div className='bandacotaikhoan'>Bạn đã có tài khoản?</div>
                                    <div className='cothidangnhap'><a href="http://localhost:1800/dangnhap" className='maucothidangnhap'>Đăng nhập</a></div>
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
export default Dangky;