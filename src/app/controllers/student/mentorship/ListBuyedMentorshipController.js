import Mentorship from "../../../models/MentorshipModel";
import Student from "../../../models/StudentModel";

class ListBuyedMentorshipController {
  async list(req, res) {
    try {
      const userId = req.user;

      const student = await Student.findOne({
        where: {
          user_id: userId,
        },
        attributes: [],
        include: [{ model: Mentorship, as: "mentorships" }],
      });
      if (!student) {
        return res.status(404).json({ error: "Estudante não cadastrado" });
      }
      if (!student.mentorships.length > 0) {
        return res
          .status(404)
          .json({ error: "Você não comprou nenhuma mentoria" });
      }

      return res.status(200).json(student);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ListBuyedMentorshipController();
