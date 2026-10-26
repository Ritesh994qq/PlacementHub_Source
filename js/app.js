const jobs = [
 {id:1,title:"Software Developer Intern",company:"TCS",logo:"TCS",logoClass:"logo-tcs",location:"Bengaluru",type:"Internship",salary:"₹25k–35k / month",posted:"2 days ago",skills:["Java","Spring Boot","MySQL"],description:"Work with product teams to build, test, and improve real-world software applications.",status:"Interview"},
 {id:2,title:"Data Analyst",company:"Accenture",logo:"a",logoClass:"logo-acn",location:"Hyderabad",type:"Full-time",salary:"₹5–7 LPA",posted:"1 day ago",skills:["Python","SQL","Power BI"],description:"Turn business data into useful insights and support data-driven decisions.",status:"Under review"},
 {id:3,title:"ML Engineer Intern",company:"Infosys",logo:"Infosys",logoClass:"logo-info",location:"Pune",type:"Internship",salary:"₹30k / month",posted:"3 days ago",skills:["Python","ML","Scikit-learn"],description:"Support machine learning experiments, model evaluation, and data preparation.",status:"Applied"},
 {id:4,title:"Web Developer",company:"Wipro",logo:"W",logoClass:"logo-wipro",location:"Remote",type:"Full-time",salary:"₹4–6 LPA",posted:"4 days ago",skills:["HTML","CSS","JavaScript"],description:"Build responsive web experiences and collaborate with design and engineering teams.",status:"Applied"},
 {id:5,title:"Business Analyst",company:"HCLTech",logo:"HCL",logoClass:"logo-hcl",location:"Gurugram",type:"Full-time",salary:"₹5–8 LPA",posted:"5 days ago",skills:["SQL","Excel","Analysis"],description:"Translate business requirements into clear reports, insights, and recommendations.",status:"Offer received"},
 {id:6,title:"Cloud Engineer Trainee",company:"IBM",logo:"IBM",logoClass:"logo-info",location:"Bengaluru",type:"Full-time",salary:"₹6–9 LPA",posted:"1 week ago",skills:["AWS","Linux","DevOps"],description:"Learn cloud deployment, monitoring, and automation with an experienced team.",status:"Under review"}
];
const companies = [
 {name:"TCS",className:"logo-tcs",tag:"TCS",desc:"Technology services, consulting, and digital transformation.",roles:2},
 {name:"Accenture",className:"logo-acn",tag:"a",desc:"Strategy, consulting, technology, and business operations.",roles:4},
 {name:"Infosys",className:"logo-info",tag:"Infosys",desc:"Digital services, cloud, engineering, and next-gen technology.",roles:3},
 {name:"Wipro",className:"logo-wipro",tag:"W",desc:"Technology consulting and IT services for global clients.",roles:2},
 {name:"HCLTech",className:"logo-hcl",tag:"HCL",desc:"Digital, engineering, cloud, and software services.",roles:3},
 {name:"IBM",className:"logo-info",tag:"IBM",desc:"Hybrid cloud, AI, consulting, and enterprise technology.",roles:2}
];
let savedJobs = new Set([2,5,6,1,3]);
let appliedJobs = new Set([1,2,3,5]);
const $ = (id) => document.getElementById(id);
const escapeHTML = (str) => String(str).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let toastTimer;
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2800)}
function goToPage(page){
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("active-page"));
 const target=$(page+"Page"); if(target) target.classList.add("active-page");
 document.querySelectorAll(".nav-item[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
 const label=({dashboard:"Overview",jobs:"Explore jobs",applications:"My applications",profile:"My profile",companies:"Companies",resources:"Learning hub"})[page]||"Overview";
 $("crumb").textContent=label; $("sidebar").classList.remove("open"); window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-page]").forEach(btn=>btn.addEventListener("click",()=>goToPage(btn.dataset.page)));
$("menuBtn").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
$("notificationBtn").addEventListener("click",()=>toast("You're all caught up — no new notifications."));
$("logoutBtn").addEventListener("click",()=>toast("Demo mode: sign-out will be connected to authentication in the backend."));
function logoMarkup(job){return `<div class="company-logo ${job.logoClass}">${escapeHTML(job.logo)}</div>`}
function jobCard(job){return `<article class="job-card"><div class="job-card-top">${logoMarkup(job)}<button class="save-job ${savedJobs.has(job.id)?"saved":""}" data-save="${job.id}" aria-label="${savedJobs.has(job.id)?"Unsave":"Save"} ${escapeHTML(job.title)}">${savedJobs.has(job.id)?"♥":"♡"}</button></div><h3>${escapeHTML(job.title)}</h3><div class="job-company">${escapeHTML(job.company)} · ${escapeHTML(job.posted)}</div><div class="job-meta"><span>⌖ ${escapeHTML(job.location)}</span><span>◷ ${escapeHTML(job.type)}</span></div><p class="job-description">${escapeHTML(job.description)}</p><div class="skill-tags">${job.skills.map(s=>`<span>${escapeHTML(s)}</span>`).join("")}</div><button class="btn ${appliedJobs.has(job.id)?"btn-outline":"btn-primary"} apply-btn" data-apply="${job.id}">${appliedJobs.has(job.id)?"✓ Applied":"Apply now →"}</button></article>`}
function bindJobButtons(root=document){root.querySelectorAll("[data-save]").forEach(btn=>btn.addEventListener("click",()=>{const id=Number(btn.dataset.save);savedJobs.has(id)?savedJobs.delete(id):savedJobs.add(id);$("savedCount").textContent=savedJobs.size;renderJobs();renderRecommended();toast(savedJobs.has(id)?"Job added to saved roles.":"Job removed from saved roles.")}));root.querySelectorAll("[data-apply]").forEach(btn=>btn.addEventListener("click",()=>{const id=Number(btn.dataset.apply);if(appliedJobs.has(id)){toast("You have already applied for this demo role.");return}appliedJobs.add(id);const job=jobs.find(j=>j.id===id);job.status="Applied";renderJobs();renderRecommended();renderApplications();toast("Application recorded in this demo. Backend persistence is not connected yet.")}))}
function renderJobs(){const q=($("jobSearch").value||$("globalSearch").value).trim().toLowerCase();const loc=$("locationFilter").value;const type=$("typeFilter").value;const list=jobs.filter(j=>(!q||[j.title,j.company,...j.skills].join(" ").toLowerCase().includes(q))&&(!loc||j.location===loc)&&(!type||j.type===type));$("allJobs").innerHTML=list.length?list.map(jobCard).join(""):`<div class="empty-state">No roles match those filters. Try another search.</div>`;$("jobResultCount").textContent=`${list.length} opportunit${list.length===1?"y":"ies"}`;bindJobButtons($("allJobs"))}
function renderRecommended(){const list=[jobs[0],jobs[1],jobs[2]];$("recommendedJobs").innerHTML=list.map(j=>`<div class="recommended-item">${logoMarkup(j)}<div class="job-info"><strong>${escapeHTML(j.title)}</strong><small>${escapeHTML(j.company)} · ${escapeHTML(j.salary)}</small><div class="job-meta"><span>⌖ ${escapeHTML(j.location)}</span><span>◷ ${escapeHTML(j.type)}</span></div></div><button class="mini-apply" data-quick-apply="${j.id}">${appliedJobs.has(j.id)?"Applied":"View role"}</button></div>`).join("");$("recommendedJobs").querySelectorAll("[data-quick-apply]").forEach(b=>b.addEventListener("click",()=>{goToPage("jobs");$("jobSearch").value=jobs.find(j=>j.id===Number(b.dataset.quickApply)).title;renderJobs()}))}
function statusClass(status){return status==="Applied"?"status-applied":status==="Under review"?"status-review":status==="Interview"?"status-interview":"status-offer"}
function renderApplications(){const rows=jobs.filter(j=>appliedJobs.has(j.id)).filter(j=>!$("statusFilter").value||j.status===$("statusFilter").value);$("applicationRows").innerHTML=rows.length?rows.map(j=>`<tr><td><div class="table-role">${logoMarkup(j)}<div><strong>${escapeHTML(j.title)}</strong><small>${escapeHTML(j.company)}</small></div></div></td><td>Oct ${String(20+j.id).padStart(2,"0")}, 2026</td><td>${escapeHTML(j.type)}</td><td><span class="status-pill ${statusClass(j.status)}">${escapeHTML(j.status)}</span></td></tr>`).join(""):`<tr><td colspan="4">No applications found for this status.</td></tr>`}
function renderCompanies(){$("companyGrid").innerHTML=companies.map(c=>`<article class="company-card"><div class="company-logo ${c.className}">${escapeHTML(c.tag)}</div><h3>${escapeHTML(c.name)}</h3><p>${escapeHTML(c.desc)}</p><div class="company-footer"><span>${c.roles} open roles</span><button class="text-button" data-company="${escapeHTML(c.name)}">Explore roles ↗</button></div></article>`).join("");$("companyGrid").querySelectorAll("[data-company]").forEach(b=>b.addEventListener("click",()=>{goToPage("jobs");$("jobSearch").value=b.dataset.company;renderJobs()}))}
$("jobSearch").addEventListener("input",renderJobs);$("locationFilter").addEventListener("change",renderJobs);$("typeFilter").addEventListener("change",renderJobs);
$("clearFilters").addEventListener("click",()=>{$("jobSearch").value="";$("globalSearch").value="";$("locationFilter").value="";$("typeFilter").value="";renderJobs()});
$("globalSearch").addEventListener("input",()=>{goToPage("jobs");$("jobSearch").value=$("globalSearch").value;renderJobs()});
$("statusFilter").addEventListener("change",renderApplications);
$("editProfileBtn").addEventListener("click",()=>$("profileDialog").showModal());$("editAboutBtn").addEventListener("click",()=>$("profileDialog").showModal());
$("profileForm").addEventListener("submit",e=>{if(e.submitter&&e.submitter.value==="cancel")return;e.preventDefault();const name=$("editName").value.trim();if(!name)return;$("profileName").textContent=name;$("detailName").textContent=name;document.querySelector(".top-user strong").textContent=name;document.querySelector(".profile-mini strong").textContent=name;toast("Profile updated in this demo.");$("profileDialog").close()});
$("resumeBtn").addEventListener("click",()=>$("resumeInput").click());$("resumeInput").addEventListener("change",()=>{if($("resumeInput").files.length)toast(`Selected resume: ${$("resumeInput").files[0].name}. Upload storage needs a backend.`)});
document.querySelectorAll(".resource-action").forEach(b=>b.addEventListener("click",()=>{$("infoTitle").textContent=b.dataset.title;$("infoBody").textContent=b.dataset.body;$("infoDialog").showModal()}));
document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("globalSearch").focus()}if(e.key==="Escape")$("sidebar").classList.remove("open")});
$("todayDate").textContent=new Date().toLocaleDateString("en-IN",{year:"numeric",month:"long",day:"numeric"});

const API_URL = "https://placementhub-backend-gp9a.onrender.com";

async function loadJobsFromBackend() {
    try {
        const response = await fetch(`${API_URL}/api/jobs`);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const apiJobs = await response.json();

        if (!Array.isArray(apiJobs)) {
            throw new Error("Invalid jobs response");
        }

        const updatedJobs = apiJobs.map(apiJob => {
            const existingJob = jobs.find(
                job => job.id === Number(apiJob.id)
            );

            if (!existingJob) {
                return {
                    id: Number(apiJob.id),
                    title: apiJob.title || "Untitled role",
                    company: apiJob.company || "Company",
                    logo: apiJob.company || "Job",
                    logoClass: "logo-info",
                    location: apiJob.location || "India",
                    type: apiJob.type || "Full-time",
                    salary: "Not specified",
                    posted: "Recently posted",
                    skills: [],
                    description: "Explore this opportunity on PlacementHub.",
                    status: "Applied"
                };
            }

            return {
    ...(existingJob || {}),
    ...apiJob,
    id: Number(apiJob.id),
    title: apiJob.title || existingJob?.title || "Untitled role",
    company: apiJob.company || existingJob?.company || "Company",
    logo: existingJob?.logo || apiJob.company || "Job",
    logoClass: existingJob?.logoClass || "logo-info",
    location: apiJob.location || existingJob?.location || "India",
    type: apiJob.type || existingJob?.type || "Full-time",
    salary: existingJob?.salary || "Not specified",
    posted: existingJob?.posted || "Recently posted",
    skills: existingJob?.skills || [],
    description: existingJob?.description || "Explore this opportunity on PlacementHub.",
    status: existingJob?.status || "Applied"
};
        });

        const apiIds = new Set(updatedJobs.map(job => job.id));
        const remainingDemoJobs = jobs.filter(
            job => !apiIds.has(job.id)
        );

        jobs.splice(0, jobs.length, ...updatedJobs, ...remainingDemoJobs);

        renderRecommended();
        renderJobs();
        renderApplications();
        renderCompanies();

        toast("Jobs loaded from backend.");
    } catch (error) {
        console.error("Backend jobs error:", error);

        renderRecommended();
        renderJobs();
        renderApplications();
        renderCompanies();

        toast("Backend unavailable. Showing demo jobs.");
    }
}

loadJobsFromBackend();
