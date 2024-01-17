import React from 'react';
import Container from '../../component/container';
import { Link } from 'react-router-dom';

const Form = () => {
    return (
        <Container>
            <div className="nk-content ">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between">
                                    <div className="nk-block-head-content">
                                        <h3 className="nk-block-title page-title">Dashboard</h3>
                                    </div>{/* .nk-block-head-content */}
                                    <div className="nk-block-head-content">
                                        <div className="toggle-wrap nk-block-tools-toggle">
                                            <a className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em className="icon ni ni-more-v" /></a>
                                            <div className="toggle-expand-content" data-content="pageMenu">
                                                <ul className="nk-block-tools g-3">
                                                    <li className="btn btn-outline-light bg-white d-none d-sm-inline-flex"><em className="icon ni ni-arrow-left" /><span>Back</span></li>
                                                    <li className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"><em className="icon ni ni-arrow-left" /></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>{/* .nk-block-head-content */}
                                </div>{/* .nk-block-between */}
                            </div>{/* .nk-block-head */}
                            <div className="nk-block">
                                <div className="row g-gs">


                                    <div className="col-xxl-8">
                                        <div className="card card-full">
                                            <div className="card-inner">
                                                <div className="card-title-group">
                                                    <div className="card-title">

                                                        <div className="nk-tb-list mt-n2">
                                                            <div className="nk-block">
                                                                <div className="row g-3">
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <label className="form-label" htmlFor="product-title">Product Title</label>
                                                                            <div className="form-control-wrap">
                                                                                <input type="text" className="form-control" id="product-title" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label className="form-label" htmlFor="regular-price">Regular Price</label>
                                                                            <div className="form-control-wrap">
                                                                                <input type="text" className="form-control" id="regular-price" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label className="form-label" htmlFor="sale-price">Sale Price</label>
                                                                            <div className="form-control-wrap">
                                                                                <input type="text" className="form-control" id="sale-price" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label className="form-label" htmlFor="stock">Stock</label>
                                                                            <div className="form-control-wrap">
                                                                                <input type="text" className="form-control" id="stock" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label className="form-label" htmlFor="SKU">SKU</label>
                                                                            <div className="form-control-wrap">
                                                                                <input type="text" className="form-control" id="SKU" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label className="form-label" htmlFor="stock">Stock</label>
                                                                            <div className="form-control-wrap">
                                                                                <input type="text" className="form-control" id="stock" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label className="form-label" htmlFor="SKU">SKU</label>
                                                                            <div className="form-control-wrap">
                                                                                <input type="text" className="form-control" id="SKU" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <label className="form-label" htmlFor="category">Category</label>
                                                                            <div className="form-control-wrap">
                                                                                <input type="text" className="form-control" id="category" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <label className="form-label" htmlFor="tags">Tags</label>
                                                                            <div className="form-control-wrap">
                                                                                <input type="text" className="form-control" id="tags" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-12">
                                                                        <button className="btn btn-primary"><em className="icon ni ni-plus" /><span>Add New</span></button>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>






                                </div>{/* .row */}
                            </div>{/* .nk-block */}
                        </div>
                    </div>
                </div>
            </div>

        </Container>
    );
}

export default Form;
