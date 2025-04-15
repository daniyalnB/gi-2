import React, { useState, useEffect, useCallback } from "react";
import { Link, withRouter } from "react-router-dom";
import LottieLoader from "../../../components/LottieLoader";
import ScrollToTop from "../../../components/ScrollToTop";
const SideMenu = React.lazy(() => import("../../components/SideMenu"));
const UserTab = React.lazy(() => import("../../components/UserTab"));
import queryString from "query-string";
import InputMask from "react-input-mask";
import ReactCrop from "react-image-crop";
import { useDropzone } from "react-dropzone";
import { Helmet } from "react-helmet";
import history from "../../../../utils/history";
import { 
	updateCustomerInfo,
	getCustomerInfoById,
} from "../../../../utils/api-routes/api-routes.util";
import back from "assets/arrowleft.svg";
import user from "assets/user-eyes.svg";
import edit from "assets/Edit.svg";

const EditUser = (props) => {

	const [loadingData, setLoadingData] = useState(true);

	const [loading, setLoading] = useState(false);

	const [error, setError] = useState(false);

	const [data, setData] = useState([]);

	const [edituser, setEditUser] = useState({
		customerId: "",
		email: "",
		firstName: "",
		lastName: "",
		phonenumber: "",
		XactProfileveriskid: "",
		alternatebillingemailid: "",
		companyname: "",
		branch: "",
		profilepicture: "",
	});

	useEffect(() => {
		getCustomerInfoById(props.match.params.id).subscribe((response) => {
			if (response.response.Requested_Action) {
				const x = response.response.data;
				setData(x);
				if (x == undefined) {
          history.push("/gi-team/users");
        }
				setEditUser({
					...edituser,
					customerId: x.id,
					email: x.ownerinfo.emailaddress,
					firstName: x.ownerinfo.firstname,
					lastName: x.ownerinfo.lastname,
					phonenumber: x.ownerinfo.phonenumber,
					XactProfileveriskid: x.xactProfileveriskid ? x.xactProfileveriskid : "",
					alternatebillingemailid: x.ownerinfo.alternatebillingemailid,
					companyname: x.ownerinfo.companyname,
					branch: x.ownerinfo.branch,
					profilepicture: x.ownerinfo.profilePicture,
				});
				setLoadingData(false);
			} else {
				history.push("/gi-team/users");
			}
		});
	}, []);

	const handleSubmitEditUser = (e) => {
		e.preventDefault();
		setLoading(true);

		const profilepicture = profileImage.profileImage;
	
		setTimeout(() => {
			const payload = {
				customerId: edituser.customerId,
				email: edituser.email,
				firstName: edituser.firstName,
				lastName: edituser.lastName,
				phonenumber: edituser.phonenumber,
				XactProfileveriskid: edituser.XactProfileveriskid,
				alternatebillingemailid: edituser.alternatebillingemailid,
				companyname: edituser.companyname,
				branch: edituser.branch,
				profilepicture: profilepicture == false ? edituser.profilepicture : profilepicture,
			};
			
			const stringified = queryString.stringify(payload);
			
			updateCustomerInfo(stringified).subscribe((response) => {
				if (response.response.Requested_Action) {
					setLoading(false);
					setError(false);
					history.push(`/gi-team/user-details/${edituser.customerId}`);
				} else {
					setLoading(false);
					setError(response.response.Message);
				}
			});
		}, 1000);
	};

  const [editProfileImage, setEditProfileImage] = useState(false);

	const [profileImage, setProfileImage] = useState<any>({
    profilepicture: false,
    profileImage: false,
  });

  const [profileImageError, setProfileImageError] = useState<string | boolean>(
    false
  );

  const [croppedImageUrl, setCroppedImageUrl] = useState<any>("");

  const [crop, setCrop] = useState<any>({
    unit: "px",
    width: 150,
    height: 150,
    x: 50,
    y: 50,
  });

  const [imageSrc, setImageSrc] = useState<any>(null);

  const [imageEl, setImageEl] = useState<HTMLImageElement>();

  const onDrop = useCallback((acceptedFiles) => {
    const sFileName = acceptedFiles[0].name;
    const sFileExtension = sFileName
      .split(".")
      [sFileName.split(".").length - 1].toLowerCase();
    const iFileSize = acceptedFiles[0].size;

    if (
      !(
        sFileExtension === "jpg" ||
        sFileExtension === "jpeg" ||
        sFileExtension === "png"
      )
    ) {
      setImageSrc(0);
      setProfileImageError("ext");
    } else if (iFileSize > 5485760) {
      setProfileImageError("size");
      setImageSrc(null);
    } else {
      setProfileImageError(false);
      setProfileImage({
        profilepicture: acceptedFiles[0],
        profileImage: URL.createObjectURL(acceptedFiles[0]),
      });
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImageSrc(reader.result);
    });
    console.log(acceptedFiles[0]);
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const onImageLoaded = (image) => {
    setImageEl(image);
  };

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    setCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if (imageEl && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageEl,
        crop,
        "newFile.jpeg"
      );
      setCroppedImageUrl(croppedImageUrl);
      setProfileImage({ ...profileImage, profileImage: croppedImageUrl });
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    canvas
      .getContext("2d")
      ?.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

    return canvas.toDataURL("image/jpeg");
  };

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<>
			<Helmet>
				<title> 
          Edit User - Actionable Insights Admin
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
											Edit User
										</h3>
									</div>
									<div className="col-3 text-right back">
										<Link
											className="bk"
											to={`/gi-team/user-details/${data.id}`}
										>
											<img src={back} className=""/>
											Back
										</Link>
									</div>
								</div>
								<hr />
								{!loadingData && (
									<form onSubmit={handleSubmitEditUser}>
										<div className="info-data">
											<div className="form-holder">
												<div className="row">
													<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
														<div className="form-group nogroup">
															<input 
																type="text" 
																name="firstname" 
																required 
																id="inputField1" 
																className="input-area"
																value={edituser.firstName}
																onChange={(e) =>
																	setEditUser({
																		...edituser,
																		firstName: e.currentTarget.value,
																	})
																}
															/>
															<label htmlFor="inputField1" className="floating_label"> First Name </label>
														</div>
													</div>
													<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
														<div className="form-group nogroup">
															<input 
																type="text" 
																name="lastname" 
																required 
																id="inputField2" 
																className="input-area"
																value={edituser.lastName}
																onChange={(e) =>
																	setEditUser({
																		...edituser,
																		lastName: e.currentTarget.value,
																	})
																}
															/>
															<label htmlFor="inputField2" className="floating_label"> Last Name </label>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
														<div className="form-group nogroup">
															<input 
																type="email" 
																name="email" 
																required 
																id="inputField3" 
																className="input-area"
																value={edituser.email}
																onChange={(e) =>
																	setEditUser({
																		...edituser,
																		email: e.currentTarget.value,
																	})
																}
															/>
															<label htmlFor="inputField3" className="floating_label"> Email </label>
														</div>
													</div>
													<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
														<div className="form-group nogroup">
															<input 
																type="text" 
																name="xactProfileveriskid" 
																required 
																id="inputField4" 
																className="input-area"
																value={edituser.XactProfileveriskid}
																onChange={(e) =>
																	setEditUser({
																		...edituser,
																		XactProfileveriskid: e.currentTarget.value,
																	})
																}
															/>
															<label htmlFor="inputField4" className="floating_label"> Xactware/Verisk ID </label>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
														<div className="form-group nogroup">
															<InputMask
																mask="999-999-9999"
																value={edituser.phonenumber}
																onChange={(e) =>
																	setEditUser({
																		...edituser,
																		phonenumber: e.currentTarget.value,
																	})
																}
															>
																{(inputProps) => (
																	<input
																		type="text"
																		name="phonenumber"
																		id="inputField5"
																		className="input-area"
																		{...inputProps}
																	/>
																)}
															</InputMask>
															<label htmlFor="inputField5" className="floating_label"> Phone </label>
														</div>
													</div>
													<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
														<div className="form-group nogroup">
															<input 
																type="email" 
																name="alternatebillingemailid"
																id="inputField6" 
																className="input-area"
																value={edituser.alternatebillingemailid}
																onChange={(e) =>
																	setEditUser({
																		...edituser,
																		alternatebillingemailid: e.currentTarget.value,
																	})
																}
															/>
															<label htmlFor="inputField6" className="floating_label"> Alternate Billing Email ID </label>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
														<div className="form-group nogroup">
															<input 
																type="text" 
																name="companyname"
																id="inputField7" 
																className="input-area"
																value={edituser.companyname}
																onChange={(e) =>
																	setEditUser({
																		...edituser,
																		companyname: e.currentTarget.value,
																	})
																}
															/>
															<label htmlFor="inputField7" className="floating_label"> Company Name </label>
														</div>
													</div>
													<div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
														<div className="form-group nogroup">
															<input 
																type="text" 
																name="branch"
																id="inputField8" 
																className="input-area"
																value={edituser.branch}
																onChange={(e) =>
																	setEditUser({
																		...edituser,
																		branch: e.currentTarget.value,
																	})
																}
															/>
															<label htmlFor="inputField8" className="floating_label"> Branch/Location </label>
														</div>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-xl-4 col-lg-3 col-md-12">
													{editProfileImage ? (
														<div className="edit-profile-section">
															<div className="section-1">
																<div>
																	{profileImage.profileImage ? (
																		<>
																			<div className="profile_image_preview">
																				<div
																					className="cross_icon"
																					onClick={() =>
																						setProfileImage({
																							profilepicture: false,
																							profileImage: false,
																						})
																					}
																				>
																					&times;
																				</div>
																				<img
																					src={profileImage.profileImage}
																					alt="profile_image"
																				/>
																			</div>
																		</>
																	) : (
																		<>
																			<div
																				{...getRootProps()}
																				className="upload_profile_picture"
																			>
																				<input
																					{...getInputProps()}
																					accept="image/jpeg"
																				/>
																				{isDragActive ? (
																					<label className="file_input_label">
																						<p> Click here to upload </p>
																						<p> account image </p>
																					</label>
																				) : (
																					<label className="file_input_label">
																						<p> Click here to upload </p>
																						<p> account image </p>
																					</label>
																				)}
																			</div>
																			{profileImageError == "size" ? (
																				<p className="profile_upload_image_info">
																					Uploaded file exceeds size limit, please upload
																					image lower than 5MB
																				</p>
																			) : (
																				""
																			)}
																			{profileImageError == "ext" ? (
																				<p className="profile_upload_image_info">
																					Invalid file extention.
																				</p>
																			) : (
																				""
																			)}
																		</>
																	)}
																</div>
																{imageSrc && (
																	<>
																		<ReactCrop
																			src={profileImageError ? "" : imageSrc}
																			crop={crop}
																			onImageLoaded={onImageLoaded}
																			onComplete={onCropComplete}
																			onChange={onCropChange}
																			//locked={true}
																		/>
																		{croppedImageUrl && (
																			<div className="image-crop-action-container">
																				<button
																					className="btn image-crop-action-btn"
																					type="button"
																					onClick={() => {
																						setProfileImage({
																							profilepicture: false,
																							profileImage: false,
																						});
																						setCroppedImageUrl();
																						setImageSrc(null);
																					}}
																				>
																					{" "}
																					Cancel{" "}
																				</button>
																				<button
																					className="btn image-crop-action-btn"
																					type="button"
																					onClick={() => {
																						setProfileImage({
																							profilepicture: croppedImageUrl,
																							profileImage: croppedImageUrl,
																						});
																						setImageSrc(null);
																					}}
																				>
																					{" "}
																					OK{" "}
																				</button>
																			</div>
																		)}
																	</>
																)}
															</div>
															<div className="section-2">
																<button
																	className="btn" 
																	onClick={() => setEditProfileImage(false)}
																>
																	Cancel
																</button>
															</div>
														</div>
													) : (
														<div className="profile-section">
															<div className="section-1">
																<div className="edit-profile">
																	<img
																		src={edit}
																		onClick={() => setEditProfileImage(true)}
																	/>
																</div>
																<div className="image-section">
																	<img 
																		src={
																			edituser.profilepicture ? edituser.profilepicture : user
																		}
																		alt=""
																		loading="lazy"
																	/>
																</div>
															</div>
														</div>
													)}
                      	</div>
											</div>
										</div>
										<hr className="second-hr" />
										<div className="Buttons">
											<div className="row">
												{!loading && 
													<button 
														className="btn"
														type="submit"
														disabled={localStorage.getItem("role") == "Analyst" ? true : false}
													> 
														<span> Update </span>
													</button>
												}
												{loading && (
													<button className="btn" disabled> 
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
								{loadingData && (
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

export default withRouter(EditUser);