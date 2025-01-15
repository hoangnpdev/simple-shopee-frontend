import { useEffect, useRef, useState } from 'react';
import './shoppe.css'
function Quanlysanpham() {
    let [count, setCount] = useState([]);
    useEffect(() => {
        fetch('http://localhost:2003/quanlysanpham', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ exampleKey: 'exampleValue' })
        })
            .then(response => response.json())
            .then(manage => {
                setCount(manage);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    // xoa san pham
    const xoasanpham = (hg1) => {
        console.log(hg1);
        fetch('http://localhost:2003/xoasanpham', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hg1 })
        })
            .then(response => response.json())
            .then(manage => {
                if (manage) {
                    window.alert('Xóa sản phẩm thành công');
                    fetch('http://localhost:2003/quanlysanpham', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify()
                    })
                        .then(response => response.json())
                        .then(update => {
                            setCount(update);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <>
            <div className='row d-flex align-items-start'>
                <div className='col-sm-2 d-flex justify-content-center mt-2' style={{ minHeight: 100, }}>
                    <div className='w-75 border p-2'>
                        <ul className='list-unstyled'>
                            <li style={{ color: '#999', fontWeight: 600 }}>Quản lý sản phẩm</li>
                            <ul className='list-unstyled' style={{ paddingLeft: '1rem' }}>
                                <a href='http://localhost:1800/quanlysanpham' className='custom-link'>Tất cả sản phẩm</a>
                                <a href='' className='custom-link'>Thêm sản phẩm</a>
                            </ul>
                        </ul>
                        <ul className='list-unstyled'>
                            <li style={{ color: '#999', fontWeight: 600 }} >Chăm sóc khách hàng</li>
                            <ul className='list-unstyled' style={{ paddingLeft: '1rem' }}>
                                <a href='' className='custom-link'>Quản lý chat</a>
                            </ul>
                        </ul>
                    </div>
                </div>
                <div className='col-sm-9'>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className='chudep'>Sản phẩm</div>
                        </div>
                        <div className='col-sm-6 d-flex justify-content-end align-items-center'>
                            <a href="http://localhost:1800/themsanpham">
                                <button type="button" className="btn btn-outline-secondary">Thêm sản phẩm mới</button>
                            </a>
                        </div>
                    </div>
                    <div className='border rounded m-2 p-3 row'>
                        <div className='row'>
                            <div className='col-sm-6 d-flex justify-content-start align-items-center'>
                                <input type="checkbox" className='p-2' />
                                <div className='chutatca p-2'>Tất cả</div>
                            </div>
                            <div className='col-sm-2 d-flex justify-content-center align-items-center'>
                                <div>Giá sản phẩm</div>
                            </div>
                            <div className='col-sm-2 d-flex justify-content-center align-items-center'>
                                <div>Số lượng trong kho</div>
                            </div>
                            <div className='col-sm-2 d-flex justify-content-center align-items-center'>
                                <div>Thao tác</div>
                            </div>
                        </div>

                        {count.map((sanpham) => <div key={sanpham.idsanpham}>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className='row'>
                                        <div className='col-sm-3'>
                                            <img className='anhquanlysanpham' src={sanpham.src} />
                                        </div>
                                        <div className='col-sm-9 p-0'>
                                            <span className='text-container'>{sanpham.tensp}</span>
                                            <div className='text-container1'>Phân loại hàng: {sanpham.phanloai}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-2 d-flex justify-content-center align-items-center'>
                                    <div>{sanpham.giatien}</div>
                                </div>
                                <div className='col-sm-2 d-flex justify-content-center align-items-center'>
                                    <div>{sanpham.tonkho}</div>
                                </div>
                                <div className='col-sm-2 d-flex justify-content-center align-items-center gap-2'>
                                    <a href={'http://localhost:1800/themsanpham/' + sanpham.idsanpham}>
                                        <button type="button" className="btn btn-outline-secondary">Cập nhật</button>
                                    </a>
                                    <button type="button" className="btn btn-outline-secondary" data-toggle="modal" data-target={`#modal${sanpham.idsanpham}`}>Xóa</button>
                                    <div className="modal fade" id={`modal${sanpham.idsanpham}`} >
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header d-flex justify-content-end">
                                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className='row'>
                                                        <div className='d-flex justify-content-center align-items-center col-sm-12'>Bạn có chắc muốn xóa sản phẩm không?</div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-3'></div>
                                                        <div className='d-flex justify-content-center align-items-center col-sm-3'>
                                                            <button className='btn btn-primary m-2 w-100' onClick={() => xoasanpham(sanpham.idsanpham)} data-dismiss="modal">Có</button>
                                                        </div>
                                                        <div className='d-flex justify-content-center align-items-center col-sm-3'>
                                                            <button className='btn btn-primary w-100' data-dismiss="modal" >Không</button>
                                                        </div>
                                                        <div className='col-sm-3'></div>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                        </div>)}
                    </div>
                </div>
                <div className='col-sm-1'></div>
            </div>

        </>
    )

}
export default Quanlysanpham;