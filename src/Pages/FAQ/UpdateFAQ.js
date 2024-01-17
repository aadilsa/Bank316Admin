import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
// import React, { useState } from 'react';
import Container from '../../component/container';
// import { AddFAQ } from '../../API/admin/faq api/admin/faqAPI';
import { AddFAQ } from '../../API/FAQ api/FAQAPI';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { GetsingleFaqdata } from '../../API/faq api/faqAPI';
import { GetsingleFaqdata } from '../../API/FAQ api/FAQAPI';
function UpdateFAQ() {
    const location = useLocation();
    const [datas, setdata] = useState();
    console.log(location.state.id, "locatationnnnnnnnnnn>>>>>>>>>>>");

    const navigate = useNavigate();
    const token = localStorage.getItem("logintoken");

    const AddSuccessToast = () => {
        toast.success('add successfully.', { autoClose: 2000 });
    };

    const addErrorToast = () => {
        toast.error('Data already exist !', {
            autoClose: 2000
        });
    };


    // const data = location.state
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        titles: [],
        subQuestions: [],
    });
    const data = datas?.data;
    console.log(datas?.data, "datatatatatatat");


    //     useEffect(() => {
    //         setFormData({
    //             question: data?.question,
    //             answer: data?.answer,
    //             titles: data?.sub_freq_askeds?.map(title => ({
    //                 title: title?.title,
    //                 content: title?.content
    //             })),
    //             subQuestions: data?.sub_freq_askeds?.map(subQuestion => ({
    //                 (subQuestion?.sub_question != null && subQuestion?.sub_answer != nul) &&
    //                 question: subQuestion?.sub_question,
    //                 answer: subQuestion?.sub_answer,
    //                 titles: subQuestion?.sub_sub_titles?.map(subTitle => ({
    //                     title: subTitle?.title,
    //                     content: subTitle?.content
    //                 }))
    //             }))
    // });
    //     }, [data]);
    // useEffect(() => {
    //     setFormData({
    //         question: data?.question,
    //         answer: data?.answer,
    //         titles: data?.sub_freq_askeds?.map((title, index) => {
    //             if (title?.title != null && title?.content != null) {
    //                 console.log("???????????????????????", index + 1)
    //                 return {
    //                     title: title?.title,
    //                     content: title?.content
    //                 }
    //             } 
    //         }),
    //         subQuestions: data?.sub_freq_askeds?.map(subQuestion => {
    //             if (subQuestion?.sub_question != null && subQuestion?.sub_answer != null) {
    //                 return {
    //                     question: subQuestion?.sub_question,
    //                     answer: subQuestion?.sub_answer,
    //                     titles: subQuestion?.sub_sub_titles?.map(subTitle => ({
    //                         title: subTitle?.title,
    //                         content: subTitle?.content
    //                     }))
    //                 };
    //             }
    //             return null; // or handle the case when sub_question or sub_answer is null
    //         })
    //     });
    // }, [data]);
    useEffect(() => {
        setFormData({
            question: data?.question,
            answer: data?.answer,

            titles: data?.sub_freq_askeds?.map((title, index) => {
                if (title?.title != null && title?.content != null) {
                    console.log("???????????????????????", index + 1);
                    return {
                        title: title?.title,
                        content: title?.content
                    };
                }
                return null;
            }).filter(Boolean),

            subQuestions: data?.sub_freq_askeds?.map(subQuestion => {
                if (subQuestion?.sub_question != null && subQuestion?.sub_answer != null) {
                    return {
                        question: subQuestion?.sub_question,
                        answer: subQuestion?.sub_answer,
                        titles: subQuestion?.sub_sub_titles?.map(subTitle => ({
                            title: subTitle?.title,
                            content: subTitle?.content
                        })).filter(Boolean)
                    };
                }
                return null; // or handle the case when sub_question or sub_answer is null
            }).filter(Boolean) // Filter out undefined values
        });
    }, [data]);


    console.log(formData, "formDataformData");

    // {
    //     "id": 20,
    //     "question": "this data  is first FAQ data",
    //     "answer": "this ans is first FAQ\n",
    //     "created_at": "2023-12-16T09:34:42.000Z",
    //     "updated_at": "2023-12-16T09:34:42.000Z",
    //     "sub_freq_askeds": [
    //         {
    //             "id": 23,
    //             "sub_question": null,
    //             "sub_answer": null,
    //             "title": "this is first title",
    //             "content": "this is first content",
    //             "created_at": "2023-12-16T09:34:42.000Z",
    //             "updated_at": "2023-12-16T09:34:42.000Z",
    //             "freq_asked_id": 20,
    //             "sub_sub_titles": []
    //         },
    //         {
    //             "id": 24,
    //             "sub_question": null,
    //             "sub_answer": null,
    //             "title": "this is second title",
    //             "content": "this is second content",
    //             "created_at": "2023-12-16T09:34:42.000Z",
    //             "updated_at": "2023-12-16T09:34:42.000Z",
    //             "freq_asked_id": 20,
    //             "sub_sub_titles": []
    //         },
    //         {
    //             "id": 25,
    //             "sub_question": "this is sub que",
    //             "sub_answer": "this is sub Answer",
    //             "title": null,
    //             "content": null,
    //             "created_at": "2023-12-16T09:34:42.000Z",
    //             "updated_at": "2023-12-16T09:34:42.000Z",
    //             "freq_asked_id": 20,
    //             "sub_sub_titles": [
    //                 {
    //                     "id": 13,
    //                     "title": "this is sub title",
    //                     "content": "this is sub content",
    //                     "created_at": "2023-12-16T09:34:42.000Z",
    //                     "updated_at": "2023-12-16T09:34:42.000Z",
    //                     "sub_freq_asked_id": 25
    //                 },
    //                 {
    //                     "id": 14,
    //                     "title": "this is second sub title",
    //                     "content": "this is  second sub content",
    //                     "created_at": "2023-12-16T09:34:42.000Z",
    //                     "updated_at": "2023-12-16T09:34:42.000Z",
    //                     "sub_freq_asked_id": 25
    //                 }
    //             ]
    //         }
    //     ]
    // },
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddTitle = () => {
        setFormData((prevData) => ({
            ...prevData,
            titles: [...prevData.titles, { title: '', content: '' }],
        }));
    };

    const handleAddSubQuestion = () => {
        setFormData((prevData) => ({
            ...prevData,
            subQuestions: [...prevData.subQuestions, { question: '', answer: '', titles: [] }],
        }));
    };

    const handleAddSubTitle = (subQuestionIndex) => {
        setFormData((prevData) => {
            const updatedSubQuestions = [...prevData.subQuestions];
            updatedSubQuestions[subQuestionIndex].titles.push({ title: '', content: '' });
            return {
                ...prevData,
                subQuestions: updatedSubQuestions,
            };
        });
    };


    function handleTitleChange(index, value, type) {
        setFormData((prevData) => {
            const updatedTitles = [...prevData.titles];
            updatedTitles[index][type] = value;
            return {
                ...prevData,
                titles: updatedTitles,
            };
        });
    }

    function handleSubQuestionChange(index, value, type) {
        setFormData((prevData) => {
            const updatedSubQuestions = [...prevData.subQuestions];
            updatedSubQuestions[index][type] = value;
            return {
                ...prevData,
                subQuestions: updatedSubQuestions,
            };
        });
    }

    function handleSubTitleChange(subQuestionIndex, subTitleIndex, value, type) {
        setFormData((prevData) => {
            const updatedSubQuestions = [...prevData.subQuestions];
            const updatedSubTitles = [...updatedSubQuestions[subQuestionIndex].titles];
            updatedSubTitles[subTitleIndex][type] = value;
            updatedSubQuestions[subQuestionIndex].titles = updatedSubTitles;
            return {
                ...prevData,
                subQuestions: updatedSubQuestions,
            };
        });
    }



    const CreateFAQ = async () => {
        // console.log(formData, "functation")
        const response = await AddFAQ(token, formData);
        console.log(response);
        if (response.status == true) {
            AddSuccessToast(response.message);
            setTimeout(() => {
                navigate('/admin/faq');
            }, 2000);

        } else {
            console.log(response);
            addErrorToast(response.message);

        }
    };



    const handleDeleteTitle = (index) => {
        setFormData((prevData) => {
            const updatedTitles = [...prevData.titles];
            updatedTitles.splice(index, 1);
            return {
                ...prevData,
                titles: updatedTitles,
            };
        });
    };

    const handleDeleteSubQuestion = (index) => {
        setFormData((prevData) => {
            const updatedSubQuestions = [...prevData.subQuestions];
            updatedSubQuestions.splice(index, 1);
            return {
                ...prevData,
                subQuestions: updatedSubQuestions,
            };
        });
    };

    const handleDeleteSubTitle = (subQuestionIndex, subTitleIndex) => {
        setFormData((prevData) => {
            const updatedSubQuestions = [...prevData.subQuestions];
            const updatedSubTitles = [...updatedSubQuestions[subQuestionIndex].titles];
            updatedSubTitles.splice(subTitleIndex, 1);
            updatedSubQuestions[subQuestionIndex].titles = updatedSubTitles;
            return {
                ...prevData,
                subQuestions: updatedSubQuestions,
            };
        });
    };




    const GetCountry = async () => {
        try {
            const totaldata = await GetsingleFaqdata(token, location.state.id);
            setdata(totaldata);
            console.log(totaldata, "this is singele api datat");
        }
        catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        GetCountry();
    }, []);

    // console.log(data, ">>>>>>>>>>>>>>>>>")
    // console.log(formData, "formdatata:::::::::::::::")
    return (
        <Container>
            <div className="nk-content ">
                <div className="container">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between g-3">
                                    <div className="nk-block-head-content">
                                        <h3 className="nk-block-title page-title"> Edit ( FAQ )</h3>
                                    </div>
                                    <div className="nk-block-head-content">
                                        <a className="btn btn-outline-light bg-white d-none d-sm-inline-flex" onClick={() => navigate(-1)}><em className="icon ni ni-arrow-left" /><span>Back</span></a>
                                        <a className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none" onClick={() => navigate(-1)}><em className="icon ni ni-arrow-left" /></a>
                                    </div>
                                    {/*
        <div className="modal-footer">
            <a className="btn btn-primary ms-auto" onClick={handleButtonClick}>
                <svg className="icon " width={18} height={18} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><line x1={12} y1={5} x2={12} y2={19} /><line x1={5} y1={12} x2={19} y2={12} /></svg>&nbsp;<p> Add question</p>
            </a>
        </div> */}


                                </div>
                            </div>

                            <div>

                                <div class="form-group">
                                    <label for="exampleFormControlInput1">Question</label>
                                    <input type="text" class="form-control" name="question" placeholder="Please Enter Question" value={formData.question} onChange={handleInputChange} />
                                </div>

                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1">Answer</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" placeholder="Please Enter Answer" name="answer" value={formData.answer} onChange={handleInputChange}></textarea>
                                </div>
                                <br />
                                {formData?.titles?.map((title, index) => (
                                    <div key={index}>
                                        <div class="form-group">
                                            <label for="exampleFormControlInput1">Title <b>{index + 1}</b></label>
                                            <input type="text" class="form-control" name="question" placeholder="Please Enter Question" value={title?.title}
                                                onChange={(e) => handleTitleChange(index, e.target.value, 'title')} />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1">Content  <b>{index + 1}</b></label>
                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" placeholder="Please Enter Answer" name="answer" value={title?.content}
                                                onChange={(e) => handleTitleChange(index, e.target.value, 'content')}></textarea>
                                        </div>
                                        <button className="btn btn-danger" onClick={() => handleDeleteTitle(index)}>
                                            Delete Title
                                        </button>
                                    </div>
                                ))}
                                <button className="btn btn-primary" onClick={handleAddSubQuestion} style={{ marginRight: '10px', marginTop: "20px", marginBottom: "20px" }}>Add Sub-Question</button>
                                <button className="btn btn-primary" onClick={handleAddTitle} style={{ marginRight: '10px', marginTop: "20px", marginBottom: "20px" }}>Add Title</button>
                                <br />
                                {formData?.subQuestions?.map((subQuestion, index) => (
                                    <div key={index}>
                                        <div class="form-group">
                                            <label for="exampleFormControlInput1">Sub-Question <b>{index + 1}</b></label>
                                            <input type="text" class="form-control" name="question" placeholder="Please Enter Question" value={subQuestion?.question}
                                                onChange={(e) => handleSubQuestionChange(index, e.target.value, 'question')} />
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1">Sub-Answer</label>
                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" placeholder="Please Enter Answer" name="answer" value={subQuestion?.answer}
                                                onChange={(e) => handleSubQuestionChange(index, e.target.value, 'answer')}></textarea><br></br>
                                            <button className="btn btn-danger" onClick={() => handleDeleteSubQuestion(index)}>
                                                Delete Sub-Question
                                            </button>
                                        </div>
                                        {subQuestion?.titles?.map((subTitle, subTitleIndex) => (
                                            <div key={subTitleIndex}>

                                                <div class="form-group">
                                                    <label for="exampleFormControlInput1">Sub-Title <b>{subTitleIndex + 1}</b></label>
                                                    <input type="text" class="form-control" name="question" placeholder="Please Enter  Sub-Title" value={subTitle.title}
                                                        onChange={(e) => handleSubTitleChange(index, subTitleIndex, e.target.value, 'title')} />
                                                </div>
                                                <div class="form-group">
                                                    <label for="exampleFormControlTextarea1">Sub-Content</label>
                                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" placeholder="Please Enter  Sub-Content" name="answer" value={subTitle.content}
                                                        onChange={(e) => handleSubTitleChange(index, subTitleIndex, e.target.value, 'content')}></textarea>
                                                </div>
                                                <button
                                                    className="btn btn-danger mb-4"
                                                    onClick={() => handleDeleteSubTitle(index, subTitleIndex)}
                                                >
                                                    Delete Sub-Title
                                                </button>
                                            </div>
                                        ))}

                                        {/* <button style={{ padding: "4px 15px", fontSize: "12px" }} data-bs-toggle="modal" data-bs-target="#modal-report"  ><span>Process</span></button> */}
                                        <button className="btn btn-primary" onClick={() => handleAddSubTitle(index)}>Add Sub-Title</button>
                                        <br />
                                    </div>
                                ))}

                            </div>
                            {/* {
                (formData.question == "" || formData.answer == "") ? <button className="btn btn-success" disabled style={{ marginLeft: '10px', marginTop: '20px', marginBottom: '20px' }}>Send</button>
                    : <button className="btn btn-success" onClick={CreateFAQ} style={{ marginLeft: '10px', marginTop: '20px', marginBottom: '20px' }}>Send</button>} */}

                            <button className="btn btn-success" onClick={CreateFAQ} style={{ marginLeft: '10px', marginTop: '20px', marginBottom: '20px' }}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default UpdateFAQ
