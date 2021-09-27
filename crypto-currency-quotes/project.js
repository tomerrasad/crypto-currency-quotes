var selected_coins_arrids = []

$(() => {

  localStorage.setItem("coins", JSON.stringify([]));

  $.get(`https://api.coingecko.com/api/v3/coins/list`, data => {
    console.log(data);

    //הפעולה של הצגת עוד מידע של מטבע
    function moreinfo_onclick() {
      $(".infobtn").off().click(function () {
        $("#gifimg").show()



        let timeNow = new Date

        if (JSON.parse(localStorage.getItem("coins")).some(e => e.id === `${this.classList[1]}`)
          && new Date(JSON.parse(localStorage.getItem("coins")).find(e => e['id'] === `${this.classList[1]}`).time) < new Date(timeNow + 2 * 60 * 1000)) {

          moreinfofunc(JSON.parse(localStorage.getItem("coins")).find(e => e['id'] === `${this.classList[1]}`).ils,
            JSON.parse(localStorage.getItem("coins")).find(e => e['id'] === `${this.classList[1]}`).eur,
            JSON.parse(localStorage.getItem("coins")).find(e => e['id'] === `${this.classList[1]}`).usd,
            JSON.parse(localStorage.getItem("coins")).find(e => e['id'] === `${this.classList[1]}`).img)
          $("#gifimg").hide()
        } else {

          const timeSaved = new Date

          $("#gifimg").show()
          $.get(`https://api.coingecko.com/api/v3/coins/${this.classList[1]}`, data2 => {

            let dataObj = {
              "ils": data2.market_data.current_price.ils,
              "eur": data2.market_data.current_price.eur,
              "usd": data2.market_data.current_price.usd,
              "img": data2.image.thumb,
              "id": this.classList[1],
              "time": timeSaved

            }
            if (JSON.parse(localStorage.getItem("coins")).filter(e => e.id === `${this.classList[1]}`).length === 0) {
              let allcoins = JSON.parse(localStorage.getItem("coins"));
              allcoins.push(dataObj)
              localStorage.setItem("coins", JSON.stringify(allcoins));


            }

            moreinfofunc = (a, b, c, d) => {
              moreinfo = $(`
                         <div class="moreinfodiv">
                         <p>${a}₪</p>
                         <p>${b}€</p>
                         <p>${c}$</p>
                         <img class="moreinfoicon" src="${d}" alt="icon">
                         </div>
                         `)

              if ($(this).parent().find(".moreinfo").is(":hidden")) {
                $(this).parent().find(".moreinfo").html(moreinfo).hide().slideToggle(2000)
                $("#gifimg").hide()

              } else {
                $(this).parent().find(".moreinfo").html(moreinfo).hide()
                $("#gifimg").hide()
              }
            }
            moreinfofunc(data2.market_data.current_price.ils, data2.market_data.current_price.eur, data2.market_data.current_price.usd, data2.image.thumb)




            $("#gifimg").hide()
          })
        }

      })
    }
    //הפעולה של הלחצן טוגלל
    function outtoggle_onclick() {
      $(".outtoggle").off().click(function (e) {
        $("#gifimg").show()
        if (e.target.checked) {

          selected_coins_arrids.push(this.classList[1])
          if (selected_coins_arrids.length >= 6) {
            $(".item1").text(`${selected_coins_arrids[0]}`)
            $(".item2").text(`${selected_coins_arrids[1]}`)
            $(".item3").text(`${selected_coins_arrids[2]}`)
            $(".item4").text(`${selected_coins_arrids[3]}`)
            $(".item5").text(`${selected_coins_arrids[4]}`)
            $(".checked").show()
            e.target.checked = false
            $(".allwayson").prop('checked', true)
            selected_coins_arrids.splice(5, 1)
            console.log(selected_coins_arrids);
            $(".disabledthescreen").show()
            $("#closebtn").off().click(function () {

              function toggleBtnUpdate(selector, number) {
                $("#gifimg").show()
                if ($(selector).is(':checked')) {

                }
                else {
                  $(`.${selected_coins_arrids[number]}`).prop('checked', false)
                  selected_coins_arrids.splice(number, 1)
                  console.log(selected_coins_arrids);

                }
              }
              toggleBtnUpdate(".togglebtn5", 4)
              toggleBtnUpdate(".togglebtn4", 3)
              toggleBtnUpdate(".togglebtn3", 2)
              toggleBtnUpdate(".togglebtn2", 1)
              toggleBtnUpdate(".togglebtn1", 0)

              $(".disabledthescreen").hide()
              $(".checked").hide()
              $("#gifimg").hide()

            })
            $("#gifimg").hide()
          }


        } else {
          selected_coins_arrids.splice(selected_coins_arrids.indexOf(this.classList[1]), 1)
          console.log(selected_coins_arrids);
          $("#gifimg").hide()

        }


        $("#gifimg").hide()
      })
    }
    //פונקציה של פתיחת דף בית
    for (let i = 700; i < 720; i++) {
      createhomepage = (a) => {

        coin = $(`
              <div class="itemsdivs">
              <h6>${data[a].id}</h6>
              <p>${data[a].symbol}</p>
              <div class="moreinfo"></div>
              
              <button type="button" class="btn ${data[a].id} btn-primary infobtn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">more info</button>
              
              <div class="form-check form-switch" id="toggle">
              <input class="form-check-input ${data[a].id} ${data[a].symbol} outtoggle" type="checkbox" id="flexSwitchCheckDefault">
              </div>
            `);
        $("#container").append(coin)

        if (selected_coins_arrids.indexOf(data[a].id) != -1) {
          $("." + data[a].id).prop("checked", true);
        }


      }
      createhomepage(i)
    }
    //פתיחת המידע הנוסף
    moreinfo_onclick();

    outtoggle_onclick();

    //לחצן הבית
    $(".active").click(function homefunc() {
      $("#gifimg").show()
      $(".grandfather").empty()

      home = $(`
          <div id="welcome">
              <h1>Welcome to the world of digital currencies.</h1>
          </div>
          <div class="container-fluid" id="container">
          </div>`)
      $(".grandfather").append(home)

      for (let i = 700; i < 720; i++) {

        createhomepage(i)
        moreinfo_onclick();
        outtoggle_onclick();

      }
      $("#gifimg").hide()
    })
    //פונקציית החיפוש
    $(".search").click(function () {
      $("#gifimg").show()
      $("#container").empty()
      for (let x = 700; x < 720; x++) {
        if ($(".me-2").val() == data[x].symbol) {
          createhomepage(x)
          console.log("enter the if");
        }
      }
      moreinfo_onclick();
      outtoggle_onclick();
      $("#gifimg").hide()
    })


    $("#gifimg").hide()



  })
  //about
  $(".aboutbtn").click(function () {
    $("#gifimg").show()
    $(".grandfather").empty()
    about = $(`
      <div class="about" class="container-fluid>
          <h1 class="aboutTitle">אודות:</h1>
          <p class="aboutinfo">בפרויקט מוצגים שערי מטבעות דיגיטליים כל מטבע שתסמנו תוכלו לעבור לתצוגת השערים בזמן אמת בצורה גרפית. הנכם מוזמנים לעיין בפיצרים וטכנולוגיה המוצגת באתר. השירות הינו חינמי לחלוטין וכל הגובה כסף על שימוש במידע זה עובר על .החוק
              הפרויקט היה מאתגר מאוד, המון תסכול. בעקבות כך למדתי המון איך להתמודד עם בעיות בדרך, נתקלתי בדברים שעד עכשיו  היו באוויר ועכשיו ממש ראיתי ויזואלית למה אני צריך אותם. רוצה להודות ליוסי שהביאני עד הלום.
              
          </p>
          <p class="aboutname">מגיש: תומר רסד, קורס 67 </p>
          <img src="myimg.jpeg.jpeg" class="myimg" alt="my pic">
      </div>`)
    $(".grandfather").append(about)
    $("#gifimg").hide()


  })
  


})



















