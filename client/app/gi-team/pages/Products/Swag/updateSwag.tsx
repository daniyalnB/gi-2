import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../../components/LottieLoader";
import ScrollToTop from "../../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../../components/UserTab"));
import {
  convertToRaw,
  EditorState,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';
import queryString from "query-string";
import CurrencyInput from "react-currency-input";
import { Helmet } from "react-helmet";
import history from "../../../../../utils/history";
import { 
  addOrUpdateSwagProduct, 
  GetAllSwagProducts 
} from "../../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";

const UpdateSwag = (props) => {

  const [loading, setLoading] = useState(true);

  const [publish, setPublish] = useState(false);
  const [draft, setDraft] = useState(false);

  const [error, setError] = useState(false);
  const [priceerror, setPriceError] = useState(false);

  function parse (val) {
    const name = queryString.parse(`name=${val}`).name;
    return name;
  }

  const [data, setData] = useState([]);

  const [swag, setSwag] = useState({
    id: "",
    permalink: "",
    multiplesize: false,
    title: "",
    tabtitle: "",
    price: 0,
    category: "",
    metadescription: "",
    metatitle: "",
    quantities: [],
    sizeguideimage: "",
    featuredimages: [],
    description: "",
    facebookogimage: "",
    sku: "",
    isdraft: true,
  });

  useEffect(() => {
    GetAllSwagProducts().subscribe((response) => {
      if (response.response.Requested_Action) {
        const x = response.response.data.filter(
          (swag) => swag.id === props.match.params.id
        )[0];
        setData(x);
        const contentBlock = htmlToDraft(x.description);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);
        }
        setSwag({
          ...swag,
          id: x.id,
          permalink: x.permalink,
          multiplesize: x.multiplesize,
          title: x.title,
          tabtitle: x.tabtitle,
          price: x.priceincents,
          category: x.category,
          metadescription: x.metadescription,
          metatitle: x.metatitle,
          quantities: x.quantity,
          sizeguideimage: x.sizeguideimage,
          featuredimages: x.featuredimages,
          description: x.description,
          facebookogimage: x.facebookogimage,
          sku: x.sku,
          isdraft: x.draft,
        });
        setConvertedContent(x.description);
        setQuantities(x.quantity);
        setLoading(false);
      } else {
        alert("error");
      }
    });
  }, []);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [convertedContent, setConvertedContent] = useState(null);
    
  const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    setConvertedContent(html);
  };

  const [quantities, setQuantities] = useState([]);

  const updateFieldChanged = index => e => {
    let newArr = [...quantities];
    newArr[index] = parseInt(e.target.value);
    setQuantities(newArr);
  }

  const sizes = [
    "Size 0 (XS)",
    "Size 2 (S)",
    "Size 3 (M)",
    "Size 4 (ML)",
    "Size 5 (L)",
    "Size 6 (XL)",
    "Size 7 (XXL)",
  ]

  const handleQuantity = (e) => {
    setSwag({ ...swag, [e.target.name]: parseInt(e.target.value) });
  }

  const onSelect = (e) =>
  setSwag({ ...swag, [e.target.name]: e.target.files[0] });

  const handleMultipleImages = (e) => {
    if (e.target.files) {
      setSwag({ ...swag, featuredimages: [...e.target.files] });
    }
  };

  const handleSubmitSingle = (e) => {
    if (swag.isdraft == false) {
      setPublish(true);
      setDraft(false);
    } else {
      setPublish(false);
      setDraft(true);
    }
    e.preventDefault();
    setTimeout(() => {
      const payload = {
        id: swag.id,
        permalink: swag.permalink.replace(/\/$/, ""),
        tabtitle: swag.tabtitle,
        multiplesize: swag.multiplesize,
        title: swag.title,
        price: swag.price,
        category: swag.category,
        metadescription: swag.metadescription,
        metatitle: swag.metatitle,
        quantities: swag.quantities,
        sku: swag.sku,
        isdraft: swag.isdraft,
        defaultfeatureimageindex: 0,
      };
      const formData = new FormData();
      for (var i = 1; i <= swag.featuredimages.length; i++) {
        formData.append(`featuredimage${i}`, swag.featuredimages[i - 1]);
      }
      formData.append("facebookogimage", swag.facebookogimage);
      formData.append("description", convertedContent);
  
      const stringified = queryString.stringify(payload);
  
      addOrUpdateSwagProduct(stringified, formData).subscribe((response) => {
        if (response.response.Requested_Action) {
          setPublish(false);
          setDraft(false);
          setError(false);
          history.push("/gi-team/products/swag");
        } else {
          setPublish(false);
          setDraft(false);
          setError(response.response.Message);
        }
      });
    }, 1000)
  };

  const handleSubmitMultiple = (e) => {
    if (swag.isdraft == false) {
      setPublish(true);
      setDraft(false);
    } else {
      setPublish(false);
      setDraft(true);
    }
    e.preventDefault();
    setTimeout(() => {
      const payload = {
        id: swag.id,
        permalink: swag.permalink,
        tabtitle: swag.tabtitle,
        multiplesize: swag.multiplesize,
        title: swag.title,
        price: swag.price,
        category: swag.category,
        metadescription: swag.metadescription,
        metatitle: swag.metatitle,
        sizes: sizes,
        quantities: quantities,
        sku: swag.sku,
        isdraft: swag.isdraft,
        defaultfeatureimageindex: 0,
      };
      const formData = new FormData();
      for (var i = 1; i <= swag.featuredimages.length; i++) {
        formData.append(`featuredimage${i}`, swag.featuredimages[i - 1]);
      }
      formData.append("sizeguideimage", swag.sizeguideimage);
      formData.append("facebookogimage", swag.facebookogimage);
      formData.append("description", convertedContent);
  
      const stringified = queryString.stringify(payload);
  
      addOrUpdateSwagProduct(stringified, formData).subscribe((response) => {
        if (response.response.Requested_Action) {
          setPublish(false);
          setDraft(false);
          setError(false);
          history.push("/gi-team/products/swag");
        } else {
          setPublish(false);
          setDraft(false);
          setError(response.response.Message);
        }
      });
    }, 1000)
  };

  function checkPrice (val) {
    if (val >= 50) {
      setPriceError(false);
    } else {
      setPriceError(true);
    }
  }

  const imageUploadCallBack = (file) => new Promise (
    (resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let img = new Image();
      reader.onload = function (e) {
        img.src = this.result
      };

      img.onload = function () {
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');

        let originWidth = this.width;
        let originHeight = this.height;

        let maxWidth = 1000,
          maxHeight = 1000;
        let targetWidth = originWidth,
          targetHeight = originHeight;
        if(originWidth > maxWidth || originHeight > maxHeight) {
          if(originWidth / originHeight > maxWidth / maxHeight) {
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        context.clearRect(0, 0, targetWidth, targetHeight);
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
           
        let newUrl = canvas.toDataURL('image/jpeg', 0.92);

        resolve({
          data: {
            link: newUrl
          }
        })
      }
    }
  )

  return (
    <>
      <Helmet>
        <title> 
          Edit Swag Product - Actionable Insights Admin
        </title>
      </Helmet>
      <div className="createInsightSheet">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <ScrollToTop />
              <SideMenu />
            </div>
            <div className="col-9">
              <div className="row">
                <UserTab />
              </div>
              <div className="createInsightSheet-section">
                <div className="row header">
                  <div className="col-9">
                    <h3 className="heading">
                      Edit Swag Product
                    </h3>
                    {swag.isdraft == true ? (
                      <div className="status_draft">
                        <span> Draft </span>
                      </div>
                    ) : (
                      <div className="status_published">
                        <span> Published </span>
                      </div>
                    )}
                  </div>
                  <div className="col-3 text-right back">
                    <Link
                      className="bk"
                      to={`/gi-team/products/view-swag/${swag.id}`}
                    >
                      <img src={back} className=""/>
                      Back
                    </Link>
                  </div>
                </div>
                <hr />
                {!loading && (
                  <form onSubmit={data.multiplesize === true ? handleSubmitMultiple : handleSubmitSingle}>
                    <div className="info-data">
                      <div className="form-holder">
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input 
                                type="text" 
                                name="Permalink" 
                                required 
                                id="inputField00" 
                                className="input-area"
                                value={swag.permalink}
                                onChange={(e) =>
                                  setSwag({
                                    ...swag,
                                    permalink: e.currentTarget.value,
                                  })
                                }
                              />
                              <label htmlFor="inputField00" className="floating_label"> Permalink </label>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input 
                                type="text" 
                                name="Category" 
                                required 
                                id="inputField0" 
                                className="input-area"
                                value={swag.category}
                                onChange={(e) =>
                                  setSwag({
                                    ...swag,
                                    category: e.currentTarget.value,
                                  })
                                }
                              />
                              <label htmlFor="inputField0" className="floating_label"> Category </label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input 
                                type="text" 
                                name="title" 
                                required 
                                id="inputField1" 
                                className="input-area"
                                value={swag.title}
                                onChange={(e) =>
                                  setSwag({
                                    ...swag,
                                    title: e.currentTarget.value,
                                  })
                                }
                              />
                              <label htmlFor="inputField1" className="floating_label"> Title </label>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <CurrencyInput
                                thousandSeparator=","
                                value={swag.price  / 100}
                                name="Price"
                                id="inputField2"
                                className="input-area"
                                onChange={(e, maskedvalue) => {
                                  setSwag({
                                    ...swag,
                                    price: parseInt((maskedvalue * 100)),
                                  });
                                  checkPrice(parseInt((maskedvalue * 100)));
                                }}
                              />
                              <label htmlFor="inputField2" className="floating_label"> Price </label>
                            </div>
                            {priceerror ? (
                              <div
                                style={{
                                  color: "#db422d",
                                  marginBottom: "20px",
                                  marginTop: "-10px",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                  padding: "0px 4px",
                                }}
                              > 
                                Price must be at least $0.50 usd
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        {!data.multiplesize && (
                          <>
                            <div className="row">
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <input 
                                    type="number"
                                    min="0"
                                    name="quantities" 
                                    required 
                                    id="inputField3" 
                                    className="input-area"
                                    value={swag.quantities[0]}
                                    onChange={(e) => handleQuantity(e)}
                                  />
                                  <label htmlFor="inputField3" className="floating_label"> Quantity </label>
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <label className="file">
                                    <input
                                      type="file"
                                      multiple
                                      name="featuredimages"
                                      accept="image/png, image/jpg, image/jpeg, image/webp"
                                      onChange={handleMultipleImages}
                                      onClick={(e) => (e.target.value = null)}
                                    />
                                    <span className="file-custom">  Featured Images  </span>
                                  </label>
                                  <div className="resolution"> Image size XXX x XXX </div>
                                  {swag.featuredimages.length !== 0 ? (
                                    <div className="facebook-image-name">
                                      {swag.featuredimages && swag.featuredimages.map((val, index) => {
                                        return (
                                          <div style={{ margin: "5px auto" }} key={index}>
                                            <a href={val} target="_blank">
                                              {swag.featuredimages[0].name ? (
                                                `${"   " + val.name}`
                                              ) : (
                                                parse(`${val.replace("https://getinsights2-data.s3.amazonaws.com/", "")}`)
                                              )}
                                            </a>
                                            {/* <span 
                                              style={{ marginLeft: "15px", cursor: "pointer", fontStyle: "initial" }}
                                              onClick={() => removeFeaturedImage(swag.id, val)}
                                            >
                                              {swag.featuredimages[0].name ? (
                                                ""
                                              ) : (
                                                "X"
                                              )}
                                            </span> */}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  ) : (
                                    <div className="facebook-image-name">
                                      Not Available
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        {data.multiplesize && (
                          <>
                            <div className="sizes">
                              <h3> Sizes </h3>
                            </div>
                            <div className="row">
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <input 
                                    type="text" 
                                    name="size0" 
                                    required 
                                    id="inputField3" 
                                    className="input-area"
                                    value="Size 0 (XS)"
                                  />
                                  <label htmlFor="inputField3" className="floating_label"> Size 0 (XS) </label>
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <input 
                                    type="number"
                                    min="0"
                                    name="quantities" 
                                    required 
                                    id="inputField4" 
                                    className="input-area"
                                    value={quantities[0]}
                                    onChange={updateFieldChanged(0)}
                                  />
                                  <label htmlFor="inputField4" className="floating_label"> Enter Quantity </label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <input 
                                    type="text" 
                                    name="size2" 
                                    required 
                                    id="inputField5" 
                                    className="input-area"
                                    value="Size 2 (S)"
                                  />
                                  <label htmlFor="inputField5" className="floating_label"> Size 2 (S) </label>
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <input 
                                    type="number"
                                    min="0"
                                    name="quantities" 
                                    required 
                                    id="inputField6" 
                                    className="input-area"
                                    value={quantities[1]}
                                    onChange={updateFieldChanged(1)}
                                  />
                                  <label htmlFor="inputField6" className="floating_label"> Enter Quantity </label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <input 
                                    type="text" 
                                    name="size3" 
                                    required 
                                    id="inputField7" 
                                    className="input-area"
                                    value="Size 3 (M)"
                                  />
                                  <label htmlFor="inputField7" className="floating_label"> Size 3 (M) </label>
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <input 
                                    type="number"
                                    min="0"
                                    name="quantity" 
                                    required 
                                    id="inputField8" 
                                    className="input-area"
                                    value={quantities[2]}
                                    onChange={updateFieldChanged(2)}
                                  />
                                  <label htmlFor="inputField8" className="floating_label"> Enter Quantity </label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <input 
                                    type="text" 
                                    name="size4" 
                                    required 
                                    id="inputField9" 
                                    className="input-area"
                                    value="Size 4 (ML)"
                                  />
                                  <label htmlFor="inputField9" className="floating_label"> Size 4 (ML) </label>
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <input 
                                    type="number"
                                    min="0"
                                    name="quantity" 
                                    required 
                                    id="inputField10" 
                                    className="input-area"
                                    value={quantities[3]}
                                    onChange={updateFieldChanged(3)}
                                  />
                                  <label htmlFor="inputField10" className="floating_label"> Enter Quantity </label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <input 
                                    type="text" 
                                    name="size5" 
                                    required 
                                    id="inputField11" 
                                    className="input-area"
                                    value="Size 5 (L)"
                                  />
                                  <label htmlFor="inputField11" className="floating_label"> Size 5 (L) </label>
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <input 
                                    type="number"
                                    min="0"
                                    name="quantity" 
                                    required 
                                    id="inputField12" 
                                    className="input-area"
                                    value={quantities[4]}
                                    onChange={updateFieldChanged(4)}
                                  />
                                  <label htmlFor="inputField12" className="floating_label"> Enter Quantity </label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <input 
                                    type="text" 
                                    name="size6" 
                                    required 
                                    id="inputField13" 
                                    className="input-area"
                                    value="Size 6 (XL)"
                                  />
                                  <label htmlFor="inputField13" className="floating_label"> Size 6 (XL) </label>
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <input 
                                    type="number"
                                    min="0"
                                    name="quantity" 
                                    required 
                                    id="inputField14" 
                                    className="input-area"
                                    value={quantities[5]}
                                    onChange={updateFieldChanged(5)}
                                  />
                                  <label htmlFor="inputField14" className="floating_label"> Enter Quantity </label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <input 
                                    type="text" 
                                    name="size7" 
                                    required 
                                    id="inputField15" 
                                    className="input-area"
                                    value="Size 7 (XXL)"
                                  />
                                  <label htmlFor="inputField15" className="floating_label"> Size 7 (XXL) </label>
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <input 
                                    type="number"
                                    min="0"
                                    name="quantity" 
                                    required 
                                    id="inputField16" 
                                    className="input-area"
                                    value={quantities[6]}
                                    onChange={updateFieldChanged(6)}
                                  />
                                  <label htmlFor="inputField16" className="floating_label"> Enter Quantity </label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <label className="file">
                                    <input
                                      type="file"
                                      name="sizeguideimage"
                                      accept="image/png, image/jpg, image/jpeg, image/webp"
                                      onChange={onSelect}
                                      onClick={(e) => (e.target.value = null)}
                                    />
                                    <span className="file-custom"> Size Guide Image  </span>
                                  </label>
                                  <div className="resolution"> Image size XXX x XXX </div>
                                  {swag.sizeguideimage ? (
                                    <div className="facebook-image-name">
                                      <a href={swag.sizeguideimage} target="_blank">
                                        {swag.sizeguideimage.name ? (
                                          `${"   " + swag.sizeguideimage.name}`
                                        ) : (
                                          parse(`${swag.sizeguideimage.replace("https://getinsights2-data.s3.amazonaws.com/", "")}`)
                                        )}
                                      </a>
                                    </div>
                                  ) : (
                                    <div className="facebook-image-name">
                                      Not Available
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="form-group nogroup">
                                  <label className="file">
                                    <input
                                      type="file"
                                      multiple
                                      name="featuredimages"
                                      accept="image/png, image/jpg, image/jpeg, image/webp"
                                      onChange={handleMultipleImages}
                                      onClick={(e) => (e.target.value = null)}
                                    />
                                    <span className="file-custom">  Featured Images  </span>
                                  </label>
                                  <div className="resolution"> Image size XXX x XXX </div>
                                  {swag.featuredimages.length !== 0 ? (
                                    <div className="facebook-image-name">
                                      {swag.featuredimages && swag.featuredimages.map((val, index) => {
                                        return (
                                          <div style={{ margin: "5px auto" }} key={index}>
                                            <a href={val} target="_blank">
                                              {swag.featuredimages[0].name ? (
                                                `${"   " + val.name}`
                                              ) : (
                                                parse(`${val.replace("https://getinsights2-data.s3.amazonaws.com/", "")}`)
                                              )}
                                            </a>
                                            {/* <span 
                                              style={{ marginLeft: "15px", cursor: "pointer", fontStyle: "initial" }}
                                              onClick={() => removeFeaturedImage(swag.id, val)}
                                            >
                                              {swag.featuredimages[0].name ? (
                                                ""
                                              ) : (
                                                "X"
                                              )}
                                            </span> */}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  ) : (
                                    <div className="facebook-image-name">
                                      Not Available
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        <div className="row mt-3">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <textarea
                                name="metatitle"
                                required
                                maxLength={160}
                                id="textField1"
                                className="input-area"
                                value={swag.metatitle}
                                onChange={(e) =>
                                  setSwag({
                                    ...swag,
                                    metatitle: e.currentTarget.value,
                                  })
                                }
                              />  
                              <label htmlFor="textField1" className="floating_label"> Meta Title </label>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <textarea
                                name="metadescription"
                                required
                                maxLength={160}
                                id="textField2"
                                className="input-area"
                                value={swag.metadescription}
                                onChange={(e) =>
                                  setSwag({
                                    ...swag,
                                    metadescription: e.currentTarget.value,
                                  })
                                }
                              />  
                              <label htmlFor="textField2" className="floating_label"> Meta Description </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="description">
                      <h3> Description </h3>
                      <div className="row">
                        <div className="col-8 Text_Editor">
                          <div className="inside">
                            <Editor
                              editorState={editorState}
                              onEditorStateChange={handleEditorChange}
                              wrapperClassName="wrapper-class"
                              editorClassName="editor-class"
                              toolbarClassName="toolbar-class"
                              placeholder="Type something here..."
                              toolbar={{
                                inline: { inDropdown: false },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: false },
                                link: { inDropdown: true },
                                history: { inDropdown: false },
                                image: {
                                  urlEnabled: true,
                                  uploadEnabled: true,
                                  alignmentEnabled: true,
                                  uploadCallback: imageUploadCallBack,
                                  previewImage: true,
                                  inputAccept: 'image/*',
                                  alt: {present: false, mandatory: false}
                                }
                              }}
                            />{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="info-data">
                      <div className="form-holder">
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <label className="file">
                                <input
                                  type="file"
                                  name="facebookogimage"
                                  accept="image/png, image/jpg, image/jpeg, image/webp"
                                  onChange={onSelect}
                                  onClick={(e) => (e.target.value = null)}
                                />
                                <span className="file-custom">  Facebook OG Image  </span>
                              </label>
                              <div className="resolution"> Image resolution 1200 x 630 pixels </div>
                              {swag.facebookogimage ? (
                                <div className="facebook-image-name">
                                  <a href={swag.facebookogimage} target="_blank">
                                    {swag.facebookogimage.name ? (
                                      `${"   " + swag.facebookogimage.name}`
                                    ) : (
                                      parse(`${swag.facebookogimage.replace("https://getinsights2-data.s3.amazonaws.com/", "")}`)
                                    )}
                                  </a>
                                </div>
                              ) : (
                                <div className="facebook-image-name">
                                  Not Available
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <input 
                                type="text" 
                                name="sku" 
                                required 
                                id="inputField20" 
                                className="input-area"
                                value={swag.sku}
                                onChange={(e) =>
                                  setSwag({
                                    ...swag,
                                    sku: e.currentTarget.value,
                                  })
                                }
                              />
                              <label htmlFor="inputField20" className="floating_label"> SKU </label>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3"></div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-group nogroup">
                              <textarea
                                name="tabtitle"
                                required
                                id="textField1"
                                className="input-area"
                                value={swag.tabtitle}
                                onChange={(e) =>
                                  setSwag({
                                    ...swag,
                                    tabtitle: e.currentTarget.value,
                                  })
                                }
                              />  
                              <label htmlFor="textField1" className="floating_label"> Tab Title </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="second-hr" />
                    <div className="Buttons">
                      <div className="row">
                        {!publish && (
                          <button 
                            className="btn" 
                            type="submit"
                            disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                            onClick={() => setSwag({ ...swag, isdraft: false })}
                          > 
                            <span> Update </span>
                          </button>
                        )}
                        {publish && (
                          <button className="btn" disabled> 
                            <i className="fas fa-spinner fa-spin"></i>
                          </button>
                        )}
                        {!draft && (
                          <button 
                            className="btn draft" 
                            type="submit"
                            disabled={localStorage.getItem("role") == "Analyst" ? true : false}
                            onClick={() => setSwag({ ...swag, isdraft: true })}
                          > 
                            <span> Save as Draft </span>
                          </button>
                        )}
                        {draft && (
                          <button className="btn draft" disabled> 
                            <i className="fas fa-spinner fa-spin"></i>
                          </button>
                        )}                                            
                      </div>
                    </div>
                    {localStorage.getItem("role") == "Analyst" && (
                      <div
                        style={{
                          padding: "0px 20px 20px 20px",
                          textAlign: "center",
                        }}
                      >
                        <div 
                          className="form-group alert alert-danger"
                          style={{ 
                            margin: "0px",
                            width: "270px",
                          }}
                        >
                          You need to be an Admin or Editor to Update
                        </div>
                      </div> 
                    )}
                    {error ? (
                      <div
                        style={{
                          padding: "0px 20px 20px 20px",
                          textAlign: "center",
                        }}
                      >
                        <div 
                          className="form-group alert alert-danger"
                          style={{ margin: "0px" }}
                        >
                          {error}
                        </div>
                      </div> 
                    ) : (
                      ""
                    )}
                  </form>
                )}
                {loading && (
                  <div className="loader-inner">
                    <LottieLoader />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(UpdateSwag);