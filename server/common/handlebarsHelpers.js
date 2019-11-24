var moment = require('moment');
var hash = require('custom-hash');
hash.configure({ maxLength: 10 });

module.exports = {
  equal: function(a, b, opts) {
    if (a == b) {
      return opts.fn(this)
    } else {
      return opts.inverse(this)
    }
  },
  addBreak: function(str) {
    if (str && typeof str === "string") {
      return str.replace(" ", "<br />");
    }
    return str;
  },
  thousandSeparator: function(str) {
    if (str) {
      return str.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return str;
  },
  lowercase: function(str) {
    if (str) {
      return str.toString().toLowerCase();
    }
    return str;
  },
  invoiceNumber: function(str) {
    console.log("str", str);
    if (str && typeof str === "string") {
      return "IN"+hash.digest(str).toUpperCase();
    }
    return str;
  },
  formatInvoiceDate: function(str) {

    if (str && typeof JSON.stringify(str) === "string") {
      console.log("INDIDE");
      return moment(str).format("MMMM YY");
    }
    return str;
  },
  formatFullInvoiceDate: function(str) {

    if (str && typeof JSON.stringify(str) === "string") {
      console.log("INDIDE");
      return moment(str).format("DD MMMM YY");
    }
    return str;
  },
  getVat: function(amount) {

    if (amount) {
      return (amount * 0.2).toFixed(2);
    }
    return amount.toFixed(2);
  },
  getSub: function(amount) {

    if (amount) {
      return (amount - (amount * 0.2)).toFixed(2);
    }
    return amount.toFixed(2);
  }

}
