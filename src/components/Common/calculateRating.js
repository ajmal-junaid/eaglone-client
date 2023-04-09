const calculateRating = (courseData) => {
    if (!courseData?.length) return 0;
    const ratings = courseData.map((item) => item.rating); // extract ratings from objects
    const sum = ratings.reduce((accumulator, rating) => accumulator + rating, 0); // calculate sum of ratings
    const average = sum / ratings.length; // calculate average rating
    return average.toFixed(1);
}

export default calculateRating;