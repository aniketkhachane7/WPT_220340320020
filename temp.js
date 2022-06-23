const express = require("express");
const mysql = require("mysql2");
const app = express();
// const cors = require("cors");
// app.use(cors());

app.use(express.static("abc"));
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

const bodyParser = require("body-parser");

const dbparams = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "wptexam",
  port: 3306,
};

let con = mysql.createConnection(dbparams);

app.get("/bookinfo", function (req, res) {
  let bookid1 = req.query.bookid;

  let details = { status: false, bookdetails: {} };
  con.query(
    "select bookid , bookname ,price from book  where bookid=?;",
    [bookid1],

    (error, row) => {
      if (error) {
        console.log("Error : " + error);
      } else if (row.length > 0) {
        details.status = true;
        details.bookdetails.bookid = row[0].bookid;
        details.bookdetails.bookname = row[0].bookname;
        details.bookdetails.price = row[0].price;
      }
      res.send(details);
    }
  );
});

// ****************** Update *****************

app.get("/bookupdate", function (req, res) {
  let bookid2 = req.query.bookid2;
  let bookname2 = req.query.bookname2;
  let price2 = req.query.price2;

  console.log(bookid2 + " __ " + bookname2 + " __ " + price2);

  let details = { status: false, bookdetails: {} };
  con.query(
    "update book set bookname=?, price=? where bookid=?;",
    [bookname2, price2, bookid2],

    (error, row) => {
      if (error) {
        console.log("Error occurs  : " + error);
      } else if (row.affectedRows > 0) {
        details.status = true;
        console.log(" Update successfull ");
      } else {
        console.log(" Update failed ");
      }
      res.send(details);
    }
  );
});

app.listen(8081, function () {
  console.log("server listening at port 8081...");
});



/*   mysql table  before update 
mysql> select * from book ;
+--------+-----------+-------+
| bookid | bookname  | price |
+--------+-----------+-------+
|     10 | Java      |    10 |
|     20 | OS        |   200 |
|     30 | database  |   300 |
+--------+-----------+-------+
*/


/*   mysql table  after update operation  

mysql> select * from book ;
+--------+----------------+-------+
| bookid | bookname       | price |
+--------+----------------+-------+
|     10 | Java OCJP Book |  1000 |
|     20 | OS Book        |  1500 |
|     30 | mysql Book     |  2000 |
+--------+----------------+-------+

*/
