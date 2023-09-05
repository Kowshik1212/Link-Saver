const saveURL = document.querySelector(".saveURL");
const inputField = document.querySelector(".inputField");
const listOfTabs = document.querySelector(".listOfTabs");
const deleteAllTabs = document.querySelector(".deleteAllTabs");
const initialDataFromLocalStorage = JSON.parse(localStorage.getItem("URLs"));
const saveTab = document.querySelector(".saveTab");
let URLs = [];
if (initialDataFromLocalStorage) {
    URLs = initialDataFromLocalStorage;
    renderURLs();
}
saveURL.addEventListener('click', () => {
    URLs.push({
        link: inputField.value,
        link_ele:
            `<li><a href=${inputField.value} class="styleLink" target="_blank">${inputField.value}</a><span>Delete</span></li>`
    });
    localStorage.setItem("URLs", JSON.stringify(URLs));
    inputField.value = "";
    renderURLs();
})

saveTab.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        URLs.push({
            link: tabs[0].url,
            link_ele:
                `<li><a href=${tabs[0].url} class="styleLink" target="_blank">${tabs[0].url}</a><span>Delete</span></li>`
        });
        localStorage.setItem("URLs", JSON.stringify(URLs));
        renderURLs();
    })
})

deleteAllTabs.addEventListener('click', () => {
    URLs.length = 0;
    localStorage.clear();
    renderURLs();
})


listOfTabs.addEventListener('click', (e) => {
    console.log(e)
    let targetURL = e.target.previousSibling.childNodes[0].data;
    let index = -1;
    for (let i = 0; i < URLs.length; i++) {
        if (URLs[i].link === targetURL) {
            index = i;
        }
    }
    if (index != -1) {
        URLs.splice(index, 1);
        localStorage.setItem("URLs", JSON.stringify(URLs));
        renderURLs();
    }
})

function renderURLs() {
    let elementToBeRendered = "";
    for (let i = 0; i < URLs.length; i++) {
        elementToBeRendered += URLs[i].link_ele;
    }
    listOfTabs.innerHTML = elementToBeRendered;
}
