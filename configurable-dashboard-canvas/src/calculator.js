function convertPointsToUnit(points, unit) {
    // Unit table from https://github.com/MrRio/jsPDF/blob/ddbfc0f0250ca908f8061a72fa057116b7613e78/jspdf.js#L791
    var multiplier;
    switch(unit) {
      case 'pt':  multiplier = 1;          break;
      case 'mm':  multiplier = 72 / 25.4;  break;
      case 'cm':  multiplier = 72 / 2.54;  break;
      case 'in':  multiplier = 72;         break;
      case 'px':  multiplier = 96 / 72;    break;
      case 'pc':  multiplier = 12;         break;
      case 'em':  multiplier = 12;         break;
      case 'ex':  multiplier = 6;
      default:
        throw ('Invalid unit: ' + unit);
    }
    console.log(points * multiplier)
    return points * multiplier;
  }

  convertPointsToUnit(317, 'mm')