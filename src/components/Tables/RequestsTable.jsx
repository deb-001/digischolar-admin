import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Tabs, Modal } from 'flowbite-react';
import { CheckCircleIcon, XMarkIcon, EyeIcon } from '@heroicons/react/24/outline';
import { db } from '../../firebase';
import { collection, doc, updateDoc, onSnapshot, getDoc, query, limit } from 'firebase/firestore';

const RequestsTable = ({ rowLimit, showTitle = true }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [applicationData, setApplicationData] = useState(null);

    // Fetch users from Firestore (users collection)
    useEffect(() => {
        setLoading(true);
        setError(null);

        const usersRef = collection(db, 'users');
        
        // Create a query with optional row limit
        const usersQuery = rowLimit ? query(usersRef, limit(rowLimit)) : usersRef;

        const unsubscribe = onSnapshot(usersQuery, (querySnapshot) => {
            const userData = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                let status = data.status || 'Pending';

                userData.push({
                    id: doc.id,
                    applicationNumber: doc.id,
                    student: data.name || 'N/A',
                    school: data.school || 'N/A',
                    status: status,
                    ...data,
                });
            });

            setUsers(userData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching user data:", error);
            setError(error.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [rowLimit]);

    // Rest of your existing code...
    useEffect(() => {
        if (selectedUser) {
            const fetchApplicationData = async () => {
                try {
                    const appDocRef = doc(db, 'applications', selectedUser.applicationNumber);
                    const appDocSnap = await getDoc(appDocRef);

                    if (appDocSnap.exists()) {
                        setApplicationData(appDocSnap.data());
                    } else {
                        console.log("No such document in applications collection!");
                        setApplicationData(null);
                    }
                } catch (error) {
                    console.error("Error fetching application data:", error);
                    setError(error.message);
                    setApplicationData(null);
                }
            };

            fetchApplicationData();
        } else {
            setApplicationData(null);
        }
    }, [selectedUser]);

    const handleAction = async (userId, action) => {
        try {
            const userRef = doc(db, "users", userId);
            const newStatus = action === 'approve' ? 'Scholarship Approved' : (action === 'reject' ? 'Rejected' : undefined);

            if (newStatus) {
                await updateDoc(userRef, { status: newStatus });
                console.log(`User ${userId} status updated to: ${newStatus}`);
            }
        } catch (error) {
            console.error("Error updating user:", error);
            setError(error.message);
        }
    };

    const handleView = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Conditional rendering based on whether we show tabs or just the table
    const tableContent = (
        <Table hoverable>
            <Table.Head>
                <Table.HeadCell>Application Number</Table.HeadCell>
                <Table.HeadCell>Student Name</Table.HeadCell>
                <Table.HeadCell>School</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {users.map((user) => (
                    <Table.Row key={user.id}>
                        <Table.Cell>{user.applicationNumber}</Table.Cell>
                        <Table.Cell>{user.student}</Table.Cell>
                        <Table.Cell>{user.school}</Table.Cell>
                        <Table.Cell>
                            <Badge
                                color={
                                    user.status === 'Scholarship Approved'
                                        ? 'success'
                                        : user.status === 'Rejected'
                                        ? 'failure'
                                        : 'warning'
                                }
                            >
                                {user.status}
                            </Badge>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="flex space-x-2">
                                <Button size="sm" color="info" onClick={() => handleView(user)}>
                                    <EyeIcon className="h-4 w-4 mr-1" /> View
                                </Button>
                                {user.status !== 'Scholarship Approved' && user.status !== 'Rejected' && (
                                    <>
                                        <Button size="sm" color="success" onClick={() => handleAction(user.id, 'approve')}>
                                            <CheckCircleIcon className="h-4 w-4 mr-1" /> Approve
                                        </Button>
                                        <Button size="sm" color="failure" onClick={() => handleAction(user.id, 'reject')}>
                                            <XMarkIcon className="h-4 w-4 mr-1" /> Reject
                                        </Button>
                                    </>
                                )}
                            </div>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );

    return (
        <div className="w-full overflow-x-auto">
            {showTitle ? (
                <Tabs aria-label="All Applications" style="underline" className="mb-4">
                    <Tabs.Item active={true} title="All Applications">
                        {tableContent}
                    </Tabs.Item>
                </Tabs>
            ) : (
                tableContent
            )}

            <Modal show={showModal} size="xl" popup onClose={closeModal}>
                <Modal.Header>
                    Application Details - {selectedUser?.applicationNumber}
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold">Documents</h3>
                            {applicationData && applicationData.fileURLs ? (
                                Object.entries(applicationData.fileURLs).map(([key, value]) => (
                                    <div key={key}>
                                        <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            View {key}
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <p>No documents found for this application.</p>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button color="gray" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RequestsTable;