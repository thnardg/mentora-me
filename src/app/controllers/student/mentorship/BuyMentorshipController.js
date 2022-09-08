import Mentor from "../../../models/MentorModel";
import Mentorship from "../../../models/MentorshipModel";
import Student from "../../../models/StudentModel";
import Wallet from "../../../models/WalletModel";
class BuyMentorshipController {
  async buy(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.findByPk(id);
      const { mentoringId } = req.body;
      const mentorship = await Mentorship.findByPk(mentoringId);
      const studentWallet = await Wallet.findOne({
        where: {
          user_id: student.user_id,
        },
      });

      if (!mentorship) {
        return res.status(401).json({ error: "mentoria não encontrada" });
      }

      const mentor = await Mentor.findByPk(mentorship.mentor_id);

      const mentorWallet = await Wallet.findOne({
        where: {
          user_id: mentor.user_id,
        },
      });
      let mentorshipPrice = parseFloat(mentorship.price);
      let studentBalance = parseFloat(studentWallet.balance);
      let mentorBalance = parseFloat(mentorWallet.balance);

      if (studentBalance < mentorshipPrice) {
        return res
          .status(401)
          .json({ error: "você não tem dinheiro suficiente para esta compra" });
      }

      studentBalance -= mentorshipPrice;
      mentorBalance += mentorshipPrice;

      await studentWallet.update({ balance: studentBalance });
      await mentorWallet.update({ balance: mentorBalance });

      await student.addMentorship(mentoringId);

      return res.status(200).json(mentorship);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new BuyMentorshipController();
