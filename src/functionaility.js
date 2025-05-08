

window.addEventListener("resize", () => { // For when the window has to resize
    
    if (window.innerWidth < 700) {
        document.getElementById("navbar").style.visibility = "hidden";
        document.getElementById("sidebar").style.visibility = "visible";
    } else {
        document.getElementById("navbar").style.visibility = "visible";
        document.getElementById("sidebar").style.visibility = "hidden";
    }
})


if (window.innerWidth < 700) {
    document.getElementById("navbar").style.visibility = "hidden";
    document.getElementById("sidebar").style.visibility = "visible";
} else {
    document.getElementById("navbar").style.visibility = "visible";
    document.getElementById("sidebar").style.visibility = "hidden";
}