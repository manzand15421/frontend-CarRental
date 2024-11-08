import { combineSlices } from "@reduxjs/toolkit";
import {signInSlice} from "./signInSlice";
import {signUpSlice} from "./signUpSlice"

const authSlices = combineSlices(
signInSlice,
signUpSlice,
)

export default authSlices

//mengumpulkan data (kotak) dari rak, ini adalah halaman rak