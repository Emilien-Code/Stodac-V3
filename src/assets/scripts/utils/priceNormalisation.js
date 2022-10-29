const formatNumber = (value) => {
    var zeroDec = /^.*^.\d{0}$/;
    var oneDec = /^.*\.\d{1}$/;


    const nb =  Math.round(value * 100) / 100

    if(zeroDec.test(nb)){
      return nb + '.00'
    }else{
      if(oneDec.test(nb)){
        return nb + '0'
      }
    }
    return nb

}
export default formatNumber;