Highcharts.theme = {
  colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
  chart: {
    style: {
      fontFamily: 'sans-serif'
    }
  },
  title: {
    style: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#000000'
    }
  },
  subtitle: {
    style: {
      fontSize: '12px',
      fontWeight: 'regular',
      color: '#666666'
    }
  },
          lang: {
            noData: "Nichts zu anzeigen"
        },
  legend: {
    title : {
      style: {
        fontSize: '12px',
        fontWeight: 'regular',
        color: '#666666',
      }
    }
  },
  plotOptions: {
    map: {
      borderColor: '#666666',
      borderWidth: '0.5',
      states: {
        hover: {
          color: '#666666'
        },
        select: {
          color: '#333333'
        }
      }
    }
  }
};