'use client';

import { useState, useEffect, useMemo } from 'react';
import type { FormData } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBarDisplay } from '@/components/ProgressBarDisplay';
import { Step1Windows } from '@/components/steps/Step1Windows';
import { Step2ServiceType } from '@/components/steps/Step2ServiceType';
import { Step3PriceQuote } from '@/components/steps/Step3PriceQuote';
import { Step4Schedule } from '@/components/steps/Step4Schedule';
import { Step5UserInfo } from '@/components/steps/Step5UserInfo';
import { Step6Confirmation } from '@/components/steps/Step6Confirmation';
import { Step7Negotiation } from '@/components/steps/Step7Negotiation';
import { ChevronLeft, ChevronRight, Check, XIcon as X, Send } from 'lucide-react'; // Renamed X to XIcon
import { useToast } from "@/hooks/use-toast";


const TOTAL_PROGRESS_STAGES = 6; // 1.Windows, 2.Service, 3.Quote, 4.Schedule, 5.Info, 6.Final

export default function WindowCleanPage() {
  const [currentUiStep, setCurrentUiStep] = useState(1);
  const [progressStep, setProgressStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({ email: ''});
  const [generatedPrice, setGeneratedPrice] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (currentUiStep === 3 && formData.windows && formData.serviceType && generatedPrice === null) {
      // Simple price calculation logic based on selections
      let basePrice = 50;
      if (formData.windows === '6-10') basePrice *= 1.5;
      if (formData.windows === '11-20') basePrice *= 2.5;

      if (formData.serviceType === 'Exterior') basePrice *= 1.2;
      if (formData.serviceType === 'Interior & Exterior') basePrice *= 2;
      
      const randomFactor = Math.random() * 0.4 + 0.8; // +/- 20%
      const finalPrice = Math.max(25, Math.round(basePrice * randomFactor)); // Minimum price $25

      setGeneratedPrice(finalPrice);
      updateFormData('price', finalPrice);
    }
  }, [currentUiStep, formData.windows, formData.serviceType, generatedPrice]);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentUiStep === 1 && !formData.windows) {
      toast({ title: "Selection Required", description: "Please select the number of windows.", variant: "destructive" });
      return;
    }
    if (currentUiStep === 2 && !formData.serviceType) {
      toast({ title: "Selection Required", description: "Please select the service type.", variant: "destructive" });
      return;
    }
    if (currentUiStep === 4 && !formData.scheduleDate) {
      toast({ title: "Selection Required", description: "Please select a date for your service.", variant: "destructive" });
      return;
    }
     if (currentUiStep === 5 && (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))) {
      toast({ title: "Validation Error", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }


    switch (currentUiStep) {
      case 1: // From Windows to Service Type
        setCurrentUiStep(2);
        setProgressStep(2);
        break;
      case 2: // From Service Type to Price Quote
        setCurrentUiStep(3);
        setProgressStep(3);
        break;
      case 4: // From Schedule to User Info
        setCurrentUiStep(5);
        setProgressStep(5);
        break;
      case 5: // From User Info to Confirmation
        setCurrentUiStep(6);
        setProgressStep(6);
        // Here you would typically send data to a backend
        console.log("Booking Submitted:", formData);
        toast({ title: "Booking Submitted!", description: "Your request has been received." });
        break;
    }
  };

  const handlePreviousStep = () => {
    switch (currentUiStep) {
      case 2: // From Service Type back to Windows
        setCurrentUiStep(1);
        setProgressStep(1);
        break;
      case 3: // From Price Quote back to Service Type
        setCurrentUiStep(2);
        setProgressStep(2);
        setGeneratedPrice(null); // Recalculate price if they go back
        break;
      case 4: // From Schedule back to Price Quote (or service type if they want to change affecting price)
        setCurrentUiStep(3); // Go back to quote, price is preserved unless they go further back
        setProgressStep(3);
        break;
      case 5: // From User Info back to Schedule
        setCurrentUiStep(4);
        setProgressStep(4);
        break;
    }
  };
  
  const handlePriceDecision = (accepted: boolean) => {
    updateFormData('acceptPrice', accepted);
    if (accepted) {
      setCurrentUiStep(4); // Go to Schedule
      setProgressStep(4);
    } else {
      setCurrentUiStep(7); // Go to Negotiation
      setProgressStep(TOTAL_PROGRESS_STAGES); // Mark as complete for this path
    }
  };

  const stepTitles: { [key: number]: string } = {
    1: "Step 1: Window Count",
    2: "Step 2: Service Type",
    3: "Step 3: Your Quote",
    4: "Step 4: Schedule Service",
    5: "Step 5: Contact Information",
    6: "Booking Confirmed!",
    7: "Let's Talk",
  };

  const currentTitle = useMemo(() => stepTitles[currentUiStep] || "WindowClean Booking", [currentUiStep]);

  const renderStepContent = () => {
    switch (currentUiStep) {
      case 1:
        return <Step1Windows formData={formData} onSelectWindows={(val) => updateFormData('windows', val)} />;
      case 2:
        return <Step2ServiceType formData={formData} onSelectServiceType={(val) => updateFormData('serviceType', val)} />;
      case 3:
        return <Step3PriceQuote price={generatedPrice} />;
      case 4:
        return <Step4Schedule formData={formData} onSelectDate={(date) => updateFormData('scheduleDate', date)} />;
      case 5:
        return <Step5UserInfo email={formData.email || ''} onEmailChange={(val) => updateFormData('email', val)} />;
      case 6:
        return <Step6Confirmation />;
      case 7:
        return <Step7Negotiation />;
      default:
        return <p>Loading...</p>;
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center min-h-screen bg-background">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold font-headline text-primary">WindowClean</h1>
          <p className="text-lg text-muted-foreground">Easy Online Booking</p>
        </header>

        {currentUiStep <= 5 && (
          <div className="mb-8">
            <ProgressBarDisplay currentStep={progressStep} totalSteps={TOTAL_PROGRESS_STAGES} />
          </div>
        )}
        
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-center">{currentTitle}</CardTitle>
          </CardHeader>
          <CardContent className="p-6 min-h-[300px] flex flex-col justify-center">
            {renderStepContent()}
          </CardContent>
          <CardFooter className="flex justify-between gap-2 p-6 border-t">
            {currentUiStep > 1 && currentUiStep < 6 && currentUiStep !== 3 && (
              <Button variant="outline" onClick={handlePreviousStep} className="font-medium">
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            {currentUiStep === 3 && ( // Special Back for Quote, goes to Step 2
               <Button variant="outline" onClick={handlePreviousStep} className="font-medium">
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            {currentUiStep === 1 || currentUiStep === 2 || currentUiStep === 4 ? (
              <Button onClick={handleNextStep} variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : null}
            {currentUiStep === 3 && (
              <div className="flex gap-4 w-full justify-center">
                <Button onClick={() => handlePriceDecision(false)} variant="destructive" className="font-medium flex-1 sm:flex-none">
                  <X className="mr-2 h-4 w-4" /> No, need a better price
                </Button>
                <Button onClick={() => handlePriceDecision(true)} variant="default" className="bg-green-600 hover:bg-green-700 text-white font-medium flex-1 sm:flex-none">
                  <Check className="mr-2 h-4 w-4" /> Yes, Book Now
                </Button>
              </div>
            )}
            {currentUiStep === 5 && (
              <Button onClick={handleNextStep} variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium">
                Submit Booking <Send className="ml-2 h-4 w-4" />
              </Button>
            )}
             {currentUiStep === 6 || currentUiStep === 7 ? (
              <Button onClick={() => { setCurrentUiStep(1); setProgressStep(1); setFormData({email: ''}); setGeneratedPrice(null); }} variant="outline" className="font-medium w-full">
                Start New Booking
              </Button>
            ) : null}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
