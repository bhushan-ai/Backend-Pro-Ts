import mongoose, { Document } from "mongoose";

export interface IResume extends Document {
  user: mongoose.Types.ObjectId;
  aboutMe: {
    name: string;
    email: string;
    mobileNo: string;
  };
  education: {
    school: string;
    highSchool: string;
    degree: string;
  }[];
  skills: string[];
  experience?: string;
  projects: {
    title: string;
    description: string;
    links: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const resumeSchema = new mongoose.Schema<IResume>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    aboutMe: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      mobileNo: {
        type: String,
        required: true,
        unique: true,
      },
    },
    education: [
      {
        school: {
          type: String,
          required: true,
        },
        highSchool: {
          type: String,
          required: true,
        },
        degree: {
          type: String,
          required: true,
        },
      },
    ],
    skills: {
      type: [String],
      required: true,
    },
    experience: {
      type: String,
    },
    projects: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        links: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Resume = mongoose.model<IResume>("Resume", resumeSchema);

export default Resume;
