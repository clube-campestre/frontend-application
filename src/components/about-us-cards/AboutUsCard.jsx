const AboutUsCard = ({ image, title, description }) => {
    return (
      <div className="p-6 max-w-sm text-center">
        <img src={image} alt={title} className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    );
  };
  
  export default AboutUsCard;