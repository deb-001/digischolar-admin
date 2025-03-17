import React, { useState, useEffect } from "react";
import { Label, ToggleSwitch, Button, TextInput } from "flowbite-react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Footer from "../components/Navigation/Footer";

export default function Settings() {
    // States
    const [notifications, setNotifications] = useState(() => JSON.parse(localStorage.getItem("notifications")) ?? true);
    const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem("darkMode")) ?? false);
    const [idValue, setIdValue] = useState(""); // State for displaying "ID" field value
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    // Save toggles in Local Storage
    useEffect(() => {
        localStorage.setItem("notifications", JSON.stringify(notifications));
    }, [notifications]);

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        document.body.classList.toggle("dark", darkMode);
    }, [darkMode]);

    // Load User Data from Firestore - Corrected Document Path
    useEffect(() => {
        const documentIdFromStorage = localStorage.getItem('userId');

        const fetchUserData = async () => {
            if (documentIdFromStorage) {
                // Correct DOCUMENT path - directly under 'login' collection
                const userRef = doc(db, "login", documentIdFromStorage); // Document reference directly to 'login' collection
                console.log("Fetching data for document ID:", documentIdFromStorage);

                try {
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        setIdValue(userData.ID || "");
                    } else {
                        setError("User data not found.");
                    }
                } catch (err) {
                    setError("Failed to fetch user data: " + err.message);
                }
            } else {
                setError("User ID not found in local storage. Please login again.");
            }
        };
        fetchUserData();
    }, []);


    // Handle Password Change - Corrected Document Path
    const handleChangePassword = async () => {
        const documentIdFromStorage = localStorage.getItem('userId');
        if (!documentIdFromStorage) {
            setError("User ID not found.");
            return;
        }

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("Please fill in all fields for password change.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            // Correct DOCUMENT path for password change
            const userRef = doc(db, "login", documentIdFromStorage); // Document reference directly to 'login' collection
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                if (userData.Password === currentPassword) {
                    await setDoc(userRef, { Password: newPassword }, { merge: true });
                    setMessage("Password updated successfully!");
                    setError(null);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                } else {
                    setError("Incorrect current password.");
                }
            } else {
                setError("User data not found.");
            }
        } catch (err) {
            setError("Failed to update password: " + err.message);
        }
    };

    return (
        // JSX - same as before
        <div className="p-6 max-w-4xl mx-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>

            {/* General Information */}
            <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">General Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="id-field" className="mb-2 block">ID</Label>
                        <TextInput id="id-field" placeholder="ID" value={idValue} readOnly disabled={true}/>
                    </div>
                    <div>
                        <Label htmlFor="country-field" className="mb-2 block">Country</Label>
                        <TextInput id="country-field" placeholder="India"  /> {/* Sample Field - No value or onChange */}
                    </div>
                    <div>
                        <Label htmlFor="city-field" className="mb-2 block">City</Label>
                        <TextInput id="city-field" placeholder="Bhubaneswar"  />       {/* Sample Field - No value or onChange */}
                    </div>
                    <div>
                        <Label htmlFor="phone-field" className="mb-2 block">Phone Number</Label>
                        <TextInput id="phone-field" placeholder="1234567890"  /> {/* Sample Field - No value or onChange */}
                    </div>
                    <div>
                        <Label htmlFor="organization-field" className="mb-2 block">Organization</Label>
                        <TextInput id="organization-field" placeholder="DIGISCHOLAR" /> {/* Sample Field - No value or onChange */}
                    </div>
                    <div>
                        <Label htmlFor="role-field" className="mb-2 block">Role</Label>
                        <TextInput id="role-field" placeholder="Admin"  />       {/* Sample Field - No value or onChange */}
                    </div>
                    <div>
                        <Label htmlFor="department-field" className="mb-2 block">Department</Label>
                        <TextInput id="department-field" placeholder="Department of Education" /> {/* Sample Field - No value or onChange */}
                    </div>
                    <div>
                        <Label htmlFor="zip-field" className="mb-2 block">ZIP/Postal Code</Label>
                        <TextInput id="zip-field" placeholder="12345" />{/* Sample Field - No value or onChange */}
                    </div>
                </div>
                {/* saveGeneralInfo Button is kept, but will not save the sample fields */}
               
            </section>

            {/* Password Change Section */}
            <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Password Information</h2>
                {error && <p className="text-red-500 mb-3">{error}</p>}
                {message && <p className="text-green-500 mb-3">{message}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    <TextInput type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <TextInput type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <Button className="mt-4" onClick={handleChangePassword}>Change Password</Button>
            </section>

            {/* Preferences & Dark Mode */}
            <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Preferences</h2>
                <div className="flex items-center justify-between mb-4">
                    <Label>Enable Notifications</Label>
                    <ToggleSwitch checked={notifications} onChange={setNotifications} />
                </div>
                <div className="flex items-center justify-between">
                    <Label>Dark Mode</Label>
                    <ToggleSwitch checked={darkMode} onChange={setDarkMode} />
                </div>
            </section>

          
        </div>
    );
}