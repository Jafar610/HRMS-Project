import { apiRequest } from "./api.js";

async function personalInfo(data){
    try {
        const employee = await apiRequest('/employees','POST',data.personalDetails);
        return employee.data.id;
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

function employement(id,data){
    let emp = data.employementDetails
    emp.employee_id = id
    return apiRequest('/employement','POST',emp); // Return the promise
}

function generalEducation(id,data){
    data.employee_id = id
    return apiRequest('/general-education','POST',data); // Return the promise
}

function diploma(id,data){
    data.employee_id = id
    return apiRequest('/collage-education','POST',data); // Return the promise
}

function higherEducation(id,data){
    data.employee_id = id
    return apiRequest('/higher-education','POST',data); // Return the promise
}

function upload(id,data){
    console.log("Upload data:", data);
    return apiRequest(`/employees/${id}/uploads`,'POST',data,null,true); // Return the promise
}

async function submitemployeeInfo(formData){
    
    let grad8 = formData.grade8.institution_name ? formData.grade8 : null;
    let grade10 = formData.grade10.institution_name ? formData.grade10 : null;
    let grade12 = formData.grade12.institution_name ? formData.grade12 : null;
    let diplomas = formData.diploma || null;
    let tti = formData.tti.grade_point ? formData.tti : null;
    let degree = formData.degree.grade_point ? formData.degree : null;
    let masters = formData.masters.grade_point ? formData.masters : null;
    let phd = formData.phd.grade_point ? formData.phd : null;
    let pphd = formData.pphd.grade_point ? formData.pphd : null;

    try {
        // 1. First create employee
        let employeeId = await personalInfo(formData);
        console.log("Employee ID created:", employeeId);

        // 2. Then employment details
        await employement(employeeId, formData);
        console.log("Employment data submitted");

        // 3. Then general education (sequential)
        if (grad8) {
            await generalEducation(employeeId, grad8);
            console.log("Grade 8 submitted");
        }
        if (grade10) {
            await generalEducation(employeeId, grade10);
            console.log("Grade 10 submitted");
        }
        if (grade12) {
            await generalEducation(employeeId, grade12);
            console.log("Grade 12 submitted");
        }

        // 4. Then diplomas (sequential)
        if (diplomas) {
            for (let dip of diplomas) {
                await diploma(employeeId, dip);
                console.log("Diploma submitted:", dip.level);
            }
        }

        // 5. Then higher education (sequential)
        if (tti) {
            await higherEducation(employeeId, tti);
            console.log("TTI submitted");
        }
        if (degree) {
            await higherEducation(employeeId, degree);
            console.log("Degree submitted");
        }
        if (masters) {
            await higherEducation(employeeId, masters);
            console.log("Masters submitted");
        }
        if (phd) {
            await higherEducation(employeeId, phd);
            console.log("PhD submitted");
        }
        if (pphd) {
            await higherEducation(employeeId, pphd);
            console.log("Post-doc submitted");
        }

        // 6. Finally upload file
        console.log("Upload data:", formData.upload);
        if (formData.upload && formData.upload.file) {
            await upload(employeeId, formData.upload);
            console.log("File upload completed");
        }

        console.log("All data submitted successfully!");
        alert("Employee information submitted successfully!");

    } catch (error) {
        console.error("Error during submission:", error);
        alert("Error submitting employee information: " + error.message);
        throw error;
    }
}

window.submitemployeeInfo = submitemployeeInfo;