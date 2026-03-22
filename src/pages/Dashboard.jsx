import React, { useEffect, useState } from 'react'
import ButtonComponent from '../components/button/Button';
import ImageComponent from '../components/images/Image';
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { MdOutlineMessage } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import InputComponent from '../components/input/Input';
import { IoFilterOutline } from "react-icons/io5";
import PetRegisterModal from '../modals/PetRegisterModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets, fetchUserDetails, updateStatus } from '../features/pets/petSlice';
import { toast } from "sonner";
import FilterModal from '../modals/FilterModal';

function Dashboard() {
  const dispatch = useDispatch();
  const { list, loading, totalCount } = useSelector((state) => state.pets);
  const [registerPetShow, setRegisterPetShow] = useState(false);
  const [filterShow, setFilterShow] = useState(false);

  const [filters, setFilters] = useState({
    patientId: '',
    petName: '',
    username: '',
    phoneNumber: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemSize = 10;
  const totalPages = Math.ceil(totalCount / itemSize);

  const userID = 135943;

  useEffect(() => {
    dispatch(fetchUserDetails(userID));
  }, []);

  useEffect(() => {
    fetchAllDatas();
  }, [filters, currentPage])

  const fetchAllDatas = () => {
    const timer = setTimeout(() => {
      const payload = {
        type: 'all',
        page: currentPage,
        itemSize,
        ...(filters.patientId && { patientId: filters.patientId }),
        ...(filters.petName && { petName: filters.petName }),
        ...(filters.username && { username: filters.username }),
        ...(filters.phoneNumber && { phoneNumber: filters.phoneNumber }),
      };

      dispatch(fetchPets(payload));
    }, 500);
    return () => clearTimeout(timer);
  }

  const handleToggleStatus = async (petId, currentStatus) => {
    const newStatus = !currentStatus;
    const result = await dispatch(updateStatus({ id: petId, status: newStatus }));
    if (updateStatus.fulfilled.match(result)) {
      fetchAllDatas();
      setTimeout(() => {
        toast.success(`Pet ${newStatus ? 'enabled' : 'disabled'} successfully`);
      }, 1000);
    } else {
      toast.error('Failed to update status');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({ patientId: '', petName: '', username: '', phoneNumber: '' });
    fetchAllDatas();
    setCurrentPage(1);
  };



  console.log('listlist', list);

  const handleApplyFilters = (filterValues) => {

    const payload = {
      type: 'all',
      page: 1,
      itemSize: 10,
      ...(filters.patientId && { patientId: filters.patientId }),
      ...(filters.petName && { petName: filters.petName }),
      ...(filters.username && { username: filters.username }),
      ...(filters.phoneNumber && { phoneNumber: filters.phoneNumber }),

      ...(filterValues.email && { email: filterValues.email }),
      ...(filterValues.color && { color: filterValues.color }),
      ...(filterValues.ownershipType && { ownershipType: filterValues.ownershipType[0] }),
      ...(filterValues.species && { species: filterValues.species[0] }),
      ...(filterValues.gender && { gender: filterValues?.gender[0] }),
      ...(filterValues.reproductiveStatus && { reproductiveStatus: filterValues.reproductiveStatus[0] }),
      ...(filterValues.bloodGroup && { bloodGroup: filterValues.bloodGroup[0] }),
      ...(filterValues.temperament && { temperament: filterValues.temperament[0] }),
    };
    setCurrentPage(1);
    dispatch(fetchPets(payload));
  };


  return (
    <div className='dashboard'>

      {
        registerPetShow &&
        <PetRegisterModal
          show={registerPetShow}
          handleClose={() => setRegisterPetShow(false)}
        />
      }

      {
        filterShow &&
        <FilterModal
          show={filterShow}
          handleClose={() => setFilterShow(false)}
          onApply={handleApplyFilters}
        />
      }

      <div className='tableFilter mb-3'>
        <InputComponent
          className='filterInp'
          placeholder='Patient ID'
          name='patientId'
          value={filters.patientId}
          onChange={handleFilterChange}
        />
        <InputComponent
          className='filterInp'
          placeholder='Pet Name'
          name='petName'
          value={filters.petName}
          onChange={handleFilterChange}
        />
        <InputComponent
          className='filterInp'
          placeholder='User Name'
          name='username'
          value={filters.username}
          onChange={handleFilterChange}
        />
        <InputComponent
          className='filterInp'
          placeholder='Phone Number'
          name='phoneNumber'
          value={filters.phoneNumber}
          onChange={handleFilterChange}
        />
        <ButtonComponent
          btnText='Filter'
          className='filterBtn fw-600'
          leftIcon={<IoFilterOutline />}
          onClick={() => setFilterShow(true)}
        />
        <ButtonComponent
          btnText='Reset'
          className='resetBtn fw-600'
          onClick={handleReset}
        />
        <ButtonComponent
          btnText='Create'
          className='themeBtn fw-600'
          onClick={() => setRegisterPetShow(true)}
        />
      </div>

      <div className='table'>
        <Table responsive className='tableStyle'>
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Pet Name</th>
              <th>Breed</th>
              <th>Gender</th>
              <th>User Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className='text-center py-4'>Loading...</td>
              </tr>
            ) : list?.length > 0 ? (
              list.map((pet, index) => (
                <tr key={pet?.inpaitentId?.petId}>
                  <td>{pet?.inpaitentId || '-'}</td>
                  <td>{pet?.listOfDatas?.petName || '-'}</td>
                  <td>{pet?.listOfDatas?.breed || '-'}</td>
                  <td>{pet?.listOfDatas?.gender || '-'}</td>
                  <td>
                    <p className='userName'>{pet?.listOfDatas?.userName || '-'}</p>
                    <p className='petCount'>No. of Pets {pet?.totalPets ?? 0}</p>
                  </td>
                  <td>
                    <div className='tableAction'>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        className='actionSwitch'
                        checked={pet?.listOfDatas?.status ?? false}
                        onChange={() => handleToggleStatus(pet?.listOfDatas?.petId, pet?.listOfDatas?.status)}
                      />
                      <MdOutlineMessage className='msgIcon' />
                      <ButtonComponent
                        btnText='Add Pet'
                        className='addBetBtn themeBtn fw-600'
                        leftIcon={<FaPlus />}
                      />
                      <ButtonComponent
                        btnText='Book'
                        className='bookBtn themeBtn fw-600'
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className='text-center py-4'>No pets found</td>
              </tr>
            )}

          </tbody>
        </Table>
      </div>




      <div className='paginationWrap mt-3 d-flex align-items-center justify-content-end gap-3'>

        <ButtonComponent
          className='pageNavBtn themeBtn'
          btnText='‹ Prev'
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        />


        <span className='pageInfo'>
          Page {currentPage} of {totalPages}
        </span>

        <ButtonComponent
          className='pageNavBtn themeBtn'
          btnText='Next ›'
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        />

      </div>


    </div>
  )
}

export default Dashboard