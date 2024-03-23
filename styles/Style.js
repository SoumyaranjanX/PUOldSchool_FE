import { StyleSheet, Dimensions } from "react-native";

// Standard Styles

export const Style = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    flexCol: {
        flexDirection: 'column',
    },
    justifyContentSpaceBetween: {
        justifyContent: 'space-between'
    },
    justifyContentCenter: {
        justifyContent: 'center'
    },
    alignItemsCenter: {
        alignItems: 'center',
    },
    h100: {
        height: '100%'
    }
})

// Individual Styles
export const CustomStyle = StyleSheet.create({

    // Header Section 

    header: {
        flexDirection:'row',
        position: 'sticky', 
        top: 0, 
        zIndex: 2,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:5,
        paddingRight:5
    },
    headerLogoContainer:{
        flex: 0.30
    },
    headerLogo: {
        width: 120,
        height: 50    
    },
    searchBoxContainer: {
        flex: 0.58,
        flexDirection:'row',
        alignItems:'center'
    },
    searchBox: {
        backgroundColor:'white',
        width:'96%',
        borderRadius: 10,
        padding: 4,
        paddingLeft:10,
    },
    profileContainer: {
        flex:0.12,
        flexDirection:'row',
        alignItems:'center'
    },
    profileImageContainer: {
        width: 40,
        height: 40,
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: 'lightgray'
    },
    profileImage: {
        width: 30,
        height: 30,
    },

    // Hero Section 

    HeroContainer: {
        marginTop:5,
        flexDirection:'row',
        justifyContent:'center',
    },
    sliderContainer: {
        height: 180,
        width: '93%',
        
    },
    image: {
        width: Dimensions.get('window').width,
        height: 200,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        width: '100%',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
    },
}) 