console.log("Products frontend javascript file");

$(function(){
    $("#process-btn").on("click", ()=>{
        $(".dish-container").slideToggle(500);
        $("#process-btn").css("display", "none");
    });
    $("#cancel-btn").on("click", ()=>{
        $(".dish-container").slideToggle(100);
        $("#process-btn").css("display", "flex");
    });

    $(".new-product-status").on("change", async function(e){
        const id = e.target.id;
        const productStatus = $(`#${id}.new-product-status`).val();

        try{
            const response = await axios.post(`/admin/product/${id}`, {productStatus: productStatus}) ;
            console.log("response:", response);
            const result = response.data;
            if(result.data){
                $(".new-product-status").blur();
            }else  alert("Prodcut update failed!");
        }
        catch(err){
            console.log(err);
            alert("Prodcut update failed!");
        }
    });
})


function validateForm(){
    const productName = $(".product-name").val(),
    productStatus = $(".product-status").val(),
    productPrice = $(".product-price").val(),
    productLeftCount = $(".product-left-count").val(),
    productCollection = $(".product-collection").val(),
    productDesc = $(".product-desc").val();
    
    if (
        productName === "" || 
        productPrice === "" || 
        productLeftCount === "" || 
        productCollection === "" ||
        productDesc === "" ||
        productStatus === ""
    ){
        alert("Please insert all the required fields!");
        return false;
    }
    else{
        return true;
    }

}

function previewFileHandler(input, order){

    const imgClassName = input.className ;

    console.log($(`.${imgClassName}`).get());

    const file = $(`.${imgClassName}`).get(0).files[0];

    const fileType = file["type"];
    const validImageType = ["image/jpg", "image/jpeg", "image/png"];

    if (!validImageType.includes(fileType)){
        alert("Please insert only jpeg, jpg and png formats!");
    }
    else{
        if(file){

            const reader = new FileReader();
            reader.onload = function(){
                $(`#image-section-${order}`).attr("src", reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

}  