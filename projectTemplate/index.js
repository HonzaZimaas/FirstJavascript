class Item {
    constructor(name, description, state) {
        this.name = name
        this.description = description
        this.state = state
        this.id = Math.floor((Math.random() * 1000000))
    }

    get itemDescription() {
        return "Task: " + this.description
    }

    get itemCompleteInfo() {
        return this.collectInfo()
    }

    collectInfo = () => {
        return "Id: " + this.id + ", Task: " + this.name + ", Description: " + this.description + ", State: " + this.state
    }
}

const ItemStateType = Object.freeze({
    NEW: "New",
    PROGRESS: "In Progress",
    DONE: "Done"
})

// Init methods
const initItemData = [
    new Item("Test Master", "Zkontrolovat testy", ItemStateType.NEW),
    new Item("Youtrack", "Vykazat cas", ItemStateType.DONE),
    new Item("Nucleus", "Nahodit Nucleus 30600", ItemStateType.PROGRESS)
]

initItemData.forEach(item => {
        setTimeout(() => updateItemList(item), 1000)
    }
)

// Basic function
function addNewItem(inputValue, descriptionVaLue) {
    updateItemList(new Item(inputValue, descriptionVaLue, ItemStateType.NEW))
}

function updateItemList(item) {
    console.log(item.itemCompleteInfo)

    const tr = document.createElement("tr")
    tr.id = item.id
    const thName = document.createElement("td")
    const textName = document.createTextNode(item.name)
    thName.appendChild(textName)

    const thDescription = document.createElement("td")
    const textDescription = document.createTextNode(item.itemDescription)
    thDescription.appendChild(textDescription)

    const thState = document.createElement("td")
    const textState = document.createTextNode(item.state)
    thState.appendChild(textState)
    thState.className = "state"
    thState.onclick = () => onClickChangeItemState(item.id)

    const thRemove = document.createElement("th")
    const textRemove = document.createTextNode("\u00D7")
    thRemove.appendChild(textRemove)
    thRemove.className = "remove"
    thRemove.onclick = () => onClickRemoveItem(item.id)

    tr.appendChild(thName)
    tr.appendChild(thDescription)
    tr.appendChild(thState)
    tr.appendChild(thRemove)

    document.getElementById("tableList").appendChild(tr)
}

// OnClick methods
function onClickAddNewItem() {
    console.info("Adding new item ... ")
    let nameValue = document.getElementById("nameValue").value;
    let descriptionVaLue = document.getElementById("descriptionValue").value;

    if (nameValue === '') {
        console.error("No values to add ... ")
        alert("You must write something!")
    } else {
        console.info("Creating new Item" + nameValue)
        addNewItem(nameValue, descriptionVaLue)
    }
    document.getElementById("nameValue").value = "";
    document.getElementById("descriptionValue").value = "";
}

function onClickChangeItemState(id) {
    console.info("Changing State of Item with Id: " + id)
    const state = document.getElementById(id).children[2].textContent
    if (state === ItemStateType.NEW) {
        document.getElementById(id).childNodes[2].textContent = ItemStateType.PROGRESS
    }
    if (state === ItemStateType.PROGRESS) {
        document.getElementById(id).childNodes[2].textContent = ItemStateType.DONE
    }
}

function onClickRemoveItem(id) {
    console.info("Removig Item with Id: " + id.toString())
    document.getElementById(id).remove()
}