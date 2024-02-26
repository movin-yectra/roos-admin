import { useNavigate, useParams } from "react-router-dom";
import BaseButton from "../../../common/components/controls/BaseButton";
import { faPlus } from "../../../common/ui/Icons/Icons";

const Customize: React.FC = () => {
  const navigate = useNavigate();
  const { menuId } = useParams();
  const customize = "customize";

  return (
    <div className="text-center">
      <div className="mt-5">
        <img
          src={require(`../../../assets/customize/${customize}.svg`)}
          alt="customize"
          width="45%"
        />
      </div>
      <p className="mt-3 fs-10 text-muted">
        If this food item have any customization click down add{" "}
      </p>
      <div className="">
        <BaseButton
          defaultClass="btn btn-warning my-3 me-2"
          name="Back"
          handleClick={() => navigate(-1)}
        />
        <BaseButton
          defaultClass="btn btn-success"
          name="Add Customization"
          icon={faPlus}
          iconPosition="start"
          id="Add Customization"
          handleClick={() =>
            navigate(
              `../${
                menuId ? `edit-menu/${menuId}` : "add-newItem"
              }/customize-menu`
            )
          }
        />
      </div>
    </div>
  );
};

export default Customize;
