const homepageLinkMapper = function(homepageData: any) {
    homepageData.page.home_page.cardlist.forEach((cardItem: any) => {
        cardItem.button.link = "/category/" + cardItem.button.link;
        cardItem.links.forEach((productItem: any) => {
            productItem.link = cardItem.button.link + "/product/" + productItem.link;
        });
        if(cardItem.subCard){
            cardItem.subCard.button.link = "/category/" + cardItem.subCard.button.link;
        }
    });
    return homepageData;
}

export default homepageLinkMapper;