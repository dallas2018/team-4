export const colors = {
  colorOne: '#fc8419', //orange
  colorOneAccent: '#ffffff',

}

export const styleScheme = {
  itemRadius: 2,
  borderWidth: 1,
  margin: 2,
  padding: 8,
}

export const authStyles = {
  container: {
     padding: styleScheme.padding,
     flex: 1,
     flexDirection: 'column',
     alignItems: 'stretch',
     justifyContent: 'center',
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        padding: styleScheme.padding,
        margin: styleScheme.margin,
        color: '#000000'
    },
    buttonContainer:{
        height: 40,
        borderRadius: styleScheme.itemRadius,
        borderWidth: styleScheme.borderWidth,
        padding: styleScheme.padding,
        margin: styleScheme.margin,
    },
    buttonText:{
        color: colors.colorOne,
        textAlign: 'center',
        fontWeight: '700'
    }
}

export const dashboardStyles = {
  shortDataListContainer: {
    height: 100
  },
  listItemDetailsContainer: {
    flexDirection: 'row',
    margin: styleScheme.margin/2,
    padding: styleScheme.padding/2
  },
  listItemSummaryContainer: {
    flexDirection: 'row',
    margin: styleScheme.margin/2,
    padding: styleScheme.padding/2
  },
  listItemIdContainer: {
    flex: .13,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  listItemPriceContainer: {
    flex: .87,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  listItemExpandContainer: {
    flexDirection: 'row'
  },
  listItemMoreDataContainer: {
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: styleScheme.borderWidth,
    margin: styleScheme.margin,
    borderRadius: styleScheme.itemRadius,
    padding: styleScheme.padding,
  },
  listItemDeleteContainer: {
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: styleScheme.borderWidth,
    margin: styleScheme.margin,
    borderRadius: styleScheme.itemRadius,
    padding: styleScheme.padding,
  },
  itemIdText: {
    fontWeight: 'bold',
    fontSize: 24
  },
  priceText: {
    fontSize: 32
  },
  detailText: {
    fontSize: 18
  },
  MoreLessText: {
    fontSize: 18,
    textDecorationLine: 'underline'
  }
}

export const styles = {
  bodyContainer: {
    padding: 2,
    backgroundColor: colors.colorOneAccent,
    flex: 1,
    flexWrap: 'wrap',
  },
  scrollViewStyle: {
    padding: styleScheme.padding,
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 2,
    margin: styleScheme.margin,
    height: 1200,
    alignItems: 'center'
  },
  listItemContainer: {
    padding: styleScheme.padding,
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 2,
    margin: styleScheme.margin
  },
  listItemContainerCentered: {
    padding: styleScheme.padding,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    margin: styleScheme.margin
  },
  addAlertBodyContainer: {
    margin: styleScheme.margin,
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  inputContainer: {
    height: 50,
    flexDirection: 'row'
  },
  headerContainer: {
    flexDirection:'column',
    marginTop: 24,
    height: 40,
    borderWidth: styleScheme.borderWidth,
    margin: 2,
    borderColor: '#000000',
    borderBottomLeftRadius: styleScheme.itemRadius,
    borderBottomRightRadius: styleScheme.itemRadius,
    borderTopLeftRadius: styleScheme.itemRadius,
    borderTopRightRadius: styleScheme.itemRadius,
  },
  listContainer: {
    flex: .9
  },
  headerStyle: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '100'
  },
  buttonText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '100'
  },
  addListItem: {
    height: 40,
    borderWidth: styleScheme.borderWidth,
    margin: styleScheme.margin,
    borderColor: '#101010',
    borderRadius: styleScheme.itemRadius,
  }
}

export const newAlertStyles = {
  newAlertTitleText: {
    fontSize: 24,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  newAlertDescText: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 'normal'
  }
}
