import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import blankprofile from "../assets/blank-profile.webp";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    avatar: currentUser.avatar,
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListngsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [emtpyListings, setEmptyListings] = useState(false);
  const [updateBtnTxt, setUpdateBtnTxt] = useState(null);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    // Instantly jump to top (0,0) whenever the path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (currentUser.username.includes("OAuth")) {
      setUpdateBtnTxt("OAuth data are always STATIC!");
    } else {
      setUpdateBtnTxt("Update Profile");
    }
  }, []);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
          setFormData({ ...formData, avatar: downloadUrl }),
        );
      },
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, updated_at: new Date() }),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser.id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      if (data.length == 0) {
        setEmptyListings(true);
      } else {
        setUserListings(data);
      }
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings(
        userListings.filter((listing) => listing.id !== listingId),
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center p-3 min-h-[80vh] md:min-h-[60vh]">
      <div className="w-full lg:w-xl">
        <div className="text-5xl text-zinc-700 text-center font-bold my-10">
          Profile
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            disabled={currentUser.username.includes("OAuth")}
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar || blankprofile}
            alt="profile"
            className="rounded-full h-30 w-30 object-cover cursor-pointer self-center mt-2"
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">Error Image upload</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">Successfully uploaded!</span>
            ) : (
              ""
            )}
          </p>
          <input
            type="text"
            placeholder="username"
            id="username"
            defaultValue={currentUser.username}
            className="border p-3 rounded-lg"
            onChange={handleChange}
            disabled={currentUser.username.includes("OAuth")}
          />
          <input
            type="text"
            placeholder="email"
            id="email"
            defaultValue={currentUser.email}
            className="border p-3 rounded-lg"
            onChange={handleChange}
            disabled={currentUser.username.includes("OAuth")}
          />
          <input
            type="password"
            placeholder="Enter your password!"
            id="password"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            disabled={currentUser.username.includes("OAuth")}
          />
          <button
            disabled={loading || currentUser.username.includes("OAuth")}
            className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition font-medium disabled:opacity-80"
          >
            {loading ? "Loading..." : updateBtnTxt}
          </button>
          <Link
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-80 text-center"
            to={"/create-listing"}
          >
            Create New Listing
          </Link>
        </form>
        <div className="flex justify-between mt-5">
          <span
            onClick={handleDeleteUser}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-3xl cursor-pointer"
          >
            Delete account
          </span>
          <span
            onClick={handleSignOut}
            className="border border-red-600/70 hover:bg-red-600/10 text-red-600 font-semibold px-8 py-2 rounded-3xl cursor-pointer"
          >
            Sign out
          </span>
        </div>
        <p className="text-red-700 mt-5">{error ? error : ""}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess ? "User is updated successfully" : ""}
        </p>
        <button
          onClick={handleShowListings}
          className="bg-zinc-700 hover:opacity-80 text-white font-semibold px-4 py-3 rounded-lg transition duration-200 w-full"
        >
          Show My Listings
        </button>
        <p className="text-red-700 mt-5">
          {" "}
          {showListngsError ? "Error showing listings" : " "}
        </p>
        {emtpyListings && (
          <p className="text-center text-2xl text-red-600 font-semibold">
            You don't have any listings.
          </p>
        )}
        {userListings && userListings.length > 0 && (
          <div className="">
            <div className="text-5xl text-zinc-700 text-center font-bold my-10">
              Your Listings:
            </div>
            {userListings.map((listing) => (
              <div
                key={listing.id}
                className="border-2 rounded-lg flex justify-between items-center gap-4 md:m-5 h-25 w-full"
              >
                <Link to={`/listing/${listing.id}`}>
                  {listing.title}
                  <img
                    src={listing.image_urls[0]}
                    alt="listing image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                </Link>
                <Link
                  className="flex-1 text-slate-700 font-semibold hover:underline truncate"
                  to={`/listing/${listing.id}`}
                >
                  <p>{listing.name}</p>
                </Link>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleListingDelete(listing.id)}
                    className="border border-red-600/70 hover:bg-red-600/10 text-red-600 font-semibold px-4 py-2 rounded-lg cursor-pointer m-1"
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing.id}`}>
                    <button className="border border-violet-600/70 hover:bg-violet-600/10 text-violet-600 font-semibold px-6 py-2 rounded-lg cursor-pointer m-1">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
