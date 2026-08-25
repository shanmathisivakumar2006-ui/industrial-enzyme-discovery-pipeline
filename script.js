/* =========================================================
   INDUSTRIAL ENZYME DISCOVERY PIPELINE
   script.js
========================================================= */


/* =========================================================
   1. ENZYME CANDIDATE DATA
========================================================= */

const enzymeData = [
    {
        organism: "T. maritima MSB8",
        protein: "TM_ORF_001",
        enzyme: "Xylanase",
        evidence: "Homology/domain-supported candidate",
        application: "Pulp & Paper"
    },
    {
        organism: "T. maritima MSB8",
        protein: "TM_ORF_002",
        enzyme: "Alpha-Amylase",
        evidence: "Functional annotation candidate",
        application: "Starch Processing"
    },
    {
        organism: "T. maritima MSB8",
        protein: "TM_ORF_003",
        enzyme: "Beta-Xylosidase",
        evidence: "Carbohydrate-active enzyme candidate",
        application: "Biomass Conversion"
    },

    {
        organism: "R. marinus R-10",
        protein: "RM_ORF_001",
        enzyme: "Xylanase",
        evidence: "Homology/domain-supported candidate",
        application: "Pulp & Paper"
    },
    {
        organism: "R. marinus R-10",
        protein: "RM_ORF_002",
        enzyme: "Cellulase",
        evidence: "Functional annotation candidate",
        application: "Biofuel Production"
    },
    {
        organism: "R. marinus R-10",
        protein: "RM_ORF_003",
        enzyme: "Alginate Lyase",
        evidence: "Functional annotation candidate",
        application: "Biomass Processing"
    },

    {
        organism: "A. acidocaldarius DSM 446",
        protein: "AA_ORF_001",
        enzyme: "Glycosidase",
        evidence: "Functional annotation candidate",
        application: "Food Biotechnology"
    },
    {
        organism: "A. acidocaldarius DSM 446",
        protein: "AA_ORF_002",
        enzyme: "Amylolytic Enzyme",
        evidence: "Domain-supported candidate",
        application: "Starch Processing"
    },
    {
        organism: "A. acidocaldarius DSM 446",
        protein: "AA_ORF_003",
        enzyme: "Proteolytic Enzyme",
        evidence: "Functional annotation candidate",
        application: "Industrial Biotechnology"
    },

    {
        organism: "T. neapolitana DSM 4359",
        protein: "TN_ORF_001",
        enzyme: "Xylanase",
        evidence: "Published enzyme evidence",
        application: "Pulp & Paper"
    },
    {
        organism: "T. neapolitana DSM 4359",
        protein: "TN_ORF_002",
        enzyme: "Endoglucanase",
        evidence: "Functional annotation candidate",
        application: "Biomass Conversion"
    },
    {
        organism: "T. neapolitana DSM 4359",
        protein: "TN_ORF_003",
        enzyme: "Beta-Glucosidase",
        evidence: "Functional annotation candidate",
        application: "Biofuel Production"
    }
];


/* =========================================================
   2. ORGANISM SUMMARY
========================================================= */

const organismCounts = {};

enzymeData.forEach(item => {

    if (!organismCounts[item.organism]) {
        organismCounts[item.organism] = 0;
    }

    organismCounts[item.organism]++;

});


/* =========================================================
   3. APPLICATION SUMMARY
========================================================= */

const applicationCounts = {};

enzymeData.forEach(item => {

    if (!applicationCounts[item.application]) {
        applicationCounts[item.application] = 0;
    }

    applicationCounts[item.application]++;

});


/* =========================================================
   4. CREATE ORGANISM CHART
========================================================= */

const enzymeChartElement =
    document.getElementById("enzymeChart");

if (enzymeChartElement) {

    new Chart(enzymeChartElement, {

        type: "bar",

        data: {

            labels: Object.keys(organismCounts),

            datasets: [{

                label: "Candidate Enzymes",

                data: Object.values(organismCounts),

                borderWidth: 1

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: true
                },

                title: {

                    display: true,

                    text:
                        "Candidate Enzymes Identified by Organism"

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {
                        stepSize: 1
                    },

                    title: {

                        display: true,

                        text:
                            "Number of Candidate Enzymes"

                    }

                },

                x: {

                    title: {

                        display: true,

                        text:
                            "Organism"

                    }

                }

            }

        }

    });

}


/* =========================================================
   5. CREATE APPLICATION CHART
========================================================= */

const applicationChartElement =
    document.getElementById("applicationChart");

if (applicationChartElement) {

    new Chart(applicationChartElement, {

        type: "bar",

        data: {

            labels:
                Object.keys(applicationCounts),

            datasets: [{

                label:
                    "Candidate Enzymes",

                data:
                    Object.values(applicationCounts),

                borderWidth: 1

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: true
                },

                title: {

                    display: true,

                    text:
                        "Industrial Application Distribution"

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {
                        stepSize: 1
                    },

                    title: {

                        display: true,

                        text:
                            "Number of Candidate Enzymes"

                    }

                }

            }

        }

    });

}


/* =========================================================
   6. SEARCH FUNCTION
========================================================= */

function searchTable() {

    const input =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();

    const table =
        document.getElementById("enzymeTable");

    if (!table) return;

    const rows =
        table.getElementsByTagName("tr");

    let visibleRows = 0;

    for (let i = 1; i < rows.length; i++) {

        const rowText =
            rows[i]
                .innerText
                .toLowerCase();

        if (rowText.includes(input)) {

            rows[i].style.display = "";

            visibleRows++;

        } else {

            rows[i].style.display = "none";

        }

    }

    updateSearchResultCount(visibleRows);

}


/* =========================================================
   7. SEARCH RESULT COUNT
========================================================= */

function updateSearchResultCount(count) {

    let resultElement =
        document.getElementById(
            "searchResultCount"
        );

    if (!resultElement) {

        resultElement =
            document.createElement("p");

        resultElement.id =
            "searchResultCount";

        resultElement.style.marginTop =
            "10px";

        resultElement.style.fontWeight =
            "bold";

        const searchBox =
            document.querySelector(".search-box");

        if (searchBox) {
            searchBox.appendChild(resultElement);
        }

    }

    resultElement.innerText =
        "Results found: " + count;

}


/* =========================================================
   8. DOWNLOAD RESULTS AS CSV
========================================================= */

function downloadCSV() {

    const table =
        document.getElementById(
            "enzymeTable"
        );

    if (!table) {

        alert(
            "Results table not found."
        );

        return;

    }

    const rows =
        table.querySelectorAll("tr");

    let csv = [];

    rows.forEach(row => {

        const columns =
            row.querySelectorAll(
                "th, td"
            );

        const rowData = [];

        columns.forEach(column => {

            let value =
                column.innerText
                    .replace(/\n/g, " ")
                    .replace(/,/g, ";")
                    .trim();

            rowData.push(value);

        });

        csv.push(
            rowData.join(",")
        );

    });

    const csvFile =
        new Blob(
            [csv.join("\n")],
            {
                type: "text/csv;charset=utf-8;"
            }
        );

    const downloadURL =
        URL.createObjectURL(csvFile);

    const link =
        document.createElement("a");

    link.href =
        downloadURL;

    link.download =
        "industrial_enzyme_results.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(
        downloadURL
    );

}


/* =========================================================
   9. SMOOTH SCROLLING
========================================================= */

document
    .querySelectorAll("nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                const targetID =
                    this.getAttribute("href");

                const target =
                    document.querySelector(
                        targetID
                    );

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });


/* =========================================================
   10. MODULE STATUS MESSAGE
========================================================= */

function showModuleStatus(
    moduleName,
    status
) {

    console.log(
        moduleName +
        " : " +
        status
    );

}


/* =========================================================
   11. PIPELINE STATUS
========================================================= */

showModuleStatus(
    "Module 1",
    "Genomic library construction completed"
);

showModuleStatus(
    "Module 2",
    "ORF prediction completed"
);

showModuleStatus(
    "Module 3",
    "Functional screening completed"
);


/* =========================================================
   12. PAGE LOAD MESSAGE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "Industrial Enzyme Discovery Pipeline loaded successfully."
        );

        console.log(
            "Total candidate enzymes:",
            enzymeData.length
        );

    }
);
