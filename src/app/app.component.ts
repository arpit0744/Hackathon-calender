import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(config: NgbModalConfig, private modalService: NgbModal) {}
  
  title = 'amazon-calender';
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  
  yms_page = "https://www.amazon.com/hz5/yourmembershipsandsubscriptions?ref_=nav_AccountFlyout_digital_subscriptions"
  order_page = ""
  /*events: CalendarEvent[] = [
    {
      title: 'An event',
      start: new Date(),
    },
  ];*/
  events = [{
      title : "Amazon prime",
      start : "2022-08-22",
      product_type : "Digital",
      product_id : "1",
      isHover : false,
      event_type : "Renewal",
      isAmazonEvent : false,
      product_detail : "Includes Prime Delivery, Prime Video, Prime Music and more",
      message : "<p>Your subscription will renew at <b>179 Rs</b> on <b>22nd August 2022</b> using <b>HDFC credit card</b></p>",
      redirect_url : "https://www.amazon.in/hz5/yourmembershipsandsubscriptions?ref_=nav_AccountFlyout_digital_subscriptions&",
      image_url : "data:image/png;base64,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"
    },
      {
        title : "Amazon Music",
        start : "2022-08-05",
        product_type : "Digital",
        product_id : "2",
        isHover : false,
        event_type : "Cancellation",
        isAmazonEvent : false,
        message : "<p>Your subscription will <b>cancel</b> on <b>5nd August 2022</b>. Renew at <b>9$</b> using your <b>HDFC credit card</b></p>",
        redirect_url : "https://www.amazon.in/hz5/yourmembershipsandsubscriptions?ref_=nav_AccountFlyout_digital_subscriptions&",
        product_detail : "Listen to your favourite playlists from over 90 million songs on Prime Music",
        image_url : "data:image/jpeg;base64,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7caD7j5TxcXN066bde8o03elWClygLGm4AU5A6KQAc+eenLPOrS6ejcrUpMUemQyspwVInVdi8ZCtALe25LD6dEr3vbTYjB9jfCLtq7bvu/ZUzyvh9efOe4OT0kZ30oCzf0qCW+An93FB6dYpUR0YYyrqVYZGRlTzHIg++dprcZbMU/3dvdFvJhSUfEOfwnJt6duNf7dqXLIENTT3QSQoVQo58snl5Tps37tb/VRtUd5z8v3JTMXEkTpkFiSIkFiSIkFiSJluILEkRuBYkiNwLEkRuBYkiNwLJERuAiIjcBERG4CIiJBZIiNwLEkRuBYkiNwLEkRuBYkiNwLEkRuAiImckCIiJAiIiQIiI3ARERIERESBEREgRERIERESBEREgRERIERESBEREgRERIERESBEkTKSCxJESCxEkSCxJESCxJESCxJLEgRERIERESBEREgRERIERESBEREgRERIERESBEREgsSRM5BYkjMSCxJmMxILEmYzEgsSZjMSCxJESCxJESCxJESCxJGYkFiTMZiQWJMxmJBYkzGYkFiSIkFkiIkCIiJAiIlSBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREA//Z"
      },
        
        {
          title : "Adidas Shoes",
          start : "2022-08-04",
          product_type : "physical",
          product_id : "3",
          isHover : false,
          isAmazonEvent : false,
          event_type : "Delivery",
          redirect_url : "https://www.amazon.in/Adidas-Ftwwht-Running-Shoes-8-BB7066/dp/B078GY7QML/ref=sr_1_3_sspa?crid=L1N91WUZUV47&keywords=adidas+shoes&qid=1659484423&sprefix=adidas+shoes%2Caps%2C237&sr=8-3-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzUVJLWkZRVFY0QUomZW5jcnlwdGVkSWQ9QTA1Nzk1MjgyNjFITUdEMTdFWEY0JmVuY3J5cHRlZEFkSWQ9QTA5ODE5MDU5NzJMNUZEVENVWTEmd2lkZ2V0TmFtZT1zcF9hdGYmYWN0aW9uPWNsaWNrUmVkaXJlY3QmZG9Ob3RMb2dDbGljaz10cnVl",
          product_detail : "Manufacturer : Adidas India Private Limited",
          image_url : "https://m.media-amazon.com/images/I/51QUw4yRCkL._UL1000_.jpg",
          message : "<p>Your product will be <b>delivered</b> on <b>4nd August 2022</b>"
        },
        {
          title : "Macbook Pro",
          start : "2022-08-07",
          product_type : "physical",
          product_id : "5",
          isHover : false,
          event_type : "Delivery",
          product_detail : "Apple MacBook Pro with Apple M1 Pro Chip (14-inch)",
          redirect_url : "https://www.amazon.in/gp/css/order-history?ref_=nav_AccountFlyout_orders",
          image_url : "https://m.media-amazon.com/images/I/61vFO3R5UNL._AC_SL1500_.jpg",
          message: "<p>Your Macbook Pro will be delivered on <b>7 August, 2022</b></p>"
        },
          
        {
        title : "Amazon Channel",
        start : "2022-07-21",
        product_type : "Digital",
        product_id : "9",
        isHover : false,
        event_type : "Renewed",
        isAmazonEvent : false,
        redirect_url : "https://www.amazon.in/hz5/yourmembershipsandsubscriptions?ref_=nav_AccountFlyout_digital_subscriptions&",
        product_detail : "Watch latest movies & Shows on Primevideo.com by joining Prime Video Channels.",
        message : "<p>Your subscription was renewed at <b>15$</b> on <b>3nd August 2022</b> using <b>SBI credit card</b></p>",
        image_url : "data:image/png;base64,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"
},
        {
        title : "KALPKART Confido Tablets - 60 Counts",
        start : "2022-08-26",
        product_type : "fresh",
        product_id : "10",
        isHover : false,
        redirect_url : "https://www.amazon.in/Manee-G-Pharma-Confido-Tablets/dp/B09B599YTW/ref=sr_1_6?adgrpid=127752730281&ext_vrnc=hi&gclid=CjwKCAjwlqOXBhBqEiwA-hhitGb45ctquB52tw6wXDP81HcvA5L6sjT0tkHrzcB2Rmg6FU4DY97M_BoCxvkQAvD_BwE&hvadid=530328045829&hvdev=c&hvlocphy=9062082&hvnetw=g&hvqmt=b&hvrand=14502517430594283076&hvtargid=kwd-392730286293&hydadcr=13922_1821454&keywords=amazon+medicines&qid=1659485967&sr=8-6",
        event_type : "Delivery",
        isAmazonEvent : false,
        product_detail : "60 Counts Orchis mascula",
        message :  "<p>Your KALPKART Confido Tablets will be delivered on <b>26 August, 2022</b></p>",
        image_url : "https://m.media-amazon.com/images/I/71LFwUqKKUL._SL1500_.jpg"
        },

          {
            title : "Prime Day",
            start : "2022-09-06",
            product_type : "Amazon",
            product_id : "11",
            isHover : false,
            isAmazonEvent : true,
            redirect_url : "https://www.amazon.com/2022-Apple-MacBook-Laptop-chip/dp/B0B3C57XLR/ref=sr_1_3?keywords=macbook+pro+13+inch&qid=1659468849&sprefix=mac%2Caps%2C263&sr=8-3",
            event_type : "Amazon Event",
            product_detail : "Prime Day is Amazon's annual deal event exclusively for Prime members, featuring epic deals on top brands and small businesses.",
            image_url :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhqyv5sYLdG3bT57Yp5pM47M-vnT_Nw8Ufow&usqp=CAU"
            },
            {
              title : "Prime Day",
              start : "2022-09-07",
              product_type : "Amazon",
              product_id : "11",
              isHover : false,
              isAmazonEvent : true,
              redirect_url : "https://www.amazon.com/2022-Apple-MacBook-Laptop-chip/dp/B0B3C57XLR/ref=sr_1_3?keywords=macbook+pro+13+inch&qid=1659468849&sprefix=mac%2Caps%2C263&sr=8-3",
              event_type : "Amazon Event",
              product_detail : "Prime Day is Amazon's annual deal event exclusively for Prime members, featuring epic deals on top brands and small businesses.",
              image_url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhqyv5sYLdG3bT57Yp5pM47M-vnT_Nw8Ufow&usqp=CAU"
              },
          {
            title : "Independence Day Sale",
            start : "2022-08-15",
            product_type : "Amazon",
            product_id : "12",
            isHover : false,
            isAmazonEvent : true,
            redirect_url : "https://www.amazon.com/",
            event_type : "Amazon Event",
            product_detail : "The biggest Sale on Electronics items, Ever.",
            image_url : "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
          },
          {
            title : "Rakshabandhan Offer",
            start : "2022-08-09",
            product_type : "Amazon",
            product_id : "13",
            isHover : false,
            redirect_url : "https://www.amazon.com/",
            isAmazonEvent : true,
            event_type : "Amazon Event",
            message: "<p>Rakshabandhan is near, get 20% off on Sweets</p>",
            product_detail : "Hurry up, Order now on so You will get your order delivered before Rakshabandhan",
            image_url : "https://ik.imagekit.io/dunzo/1645097129515_variant_5f1abbe679d1f517d0cca43f_1.jpg"
          }   

    ]
   
    compareDate(dateObject: Date, dateString: string) {
       let date1 = dateObject;
       let date2 = new Date(dateString);
       return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
    }  
    isPreviousDate(dateString: string)
    {
      let currentDate = new Date();
      let date2 = new Date(dateString);

      return date2 < currentDate;
    }
    getColourCode(product_type:string)
    {
      if(product_type == "Digital")
      {
        return "bg-primary";
      }
      else if(product_type == "physical"){
        return "bg-warning";
      }
      else if(product_type == "fresh")
      {
        return "bg-success";
      }
      else if(product_type == "Amazon")
      {
        return "bg-danger"
      }
      else{
        return "bg-info";
      }
    }

    open(content: any) {
      this.modalService.open(content);
    }


}


